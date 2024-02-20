import {View, Text, TextInput, StyleSheet, FlatList} from 'react-native';
import common from '../../styles/sharedStyles';
import {getUserFollowings} from '../../services/UserService';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {useStore} from '../../containers/StoreContainer';
import {FollowersActionType} from '../../containers/FollowersAction';
import {showMessage} from 'react-native-flash-message';
import {searchUsers} from '../../services/SearchService';
import UserItem from '../../components/profile/UserItem';
import SelectedUsers from '../../components/profile/SelectedUsers';

const Followers = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const {
    dispatch,
    store: {selectedUsers},
  } = useStore();

  const {bold, font16, pl15, pr15, pb10, pt10} = common;

  const {data, refetch, isFetching} = useQuery({
    queryKey: ['getUserFollowing'],
    queryFn: getUserFollowings,
  });

  const handleSearchUsers = useMutation({
    mutationFn: search => searchUsers(search),
    onSuccess: ({profiles}) => {
      setSearchResult(
        profiles.map(profile => ({...profile, user_id: profile.id})),
      );
      console.log(JSON.stringify(searchResult));
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.length === 0) {
        setSearchResult([]);
        return;
      }

      handleSearchUsers.mutate({
        limit: 50,
        offset: 0,
        username: searchText,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    return () => dispatch({type: FollowersActionType.CLEAR_LIST});
  }, []);

  return (
    <View style={[pl15, pr15]}>
      <TextInput
        placeholder="Search"
        onChangeText={setSearchText}
        value={searchText}
        style={styles.textInput}
      />

      <SelectedUsers data={selectedUsers} />

      {searchText ? (
        <FlatList
          data={searchResult}
          renderItem={({item}) => <UserItem item={item} />}
          keyExtractor={item => item.user_id}
        />
      ) : (
        <FlatList
          data={data?.following}
          renderItem={({item}) => <UserItem item={item} />}
          keyExtractor={item => item.user_id}
          onRefresh={refetch}
          refreshing={isFetching}
          ListHeaderComponent={
            <Text style={[bold, font16, pb10, pt10]}>Suggested</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 200,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Followers;
