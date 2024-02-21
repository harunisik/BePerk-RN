import {View, Text, TextInput, StyleSheet, FlatList} from 'react-native';
import common from '../../styles/sharedStyles';
import {getUserFollowings} from '../../services/UserService';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {useStore} from '../../containers/StoreContainer';
import {FollowersActionType} from '../../containers/FollowersAction';
import UserItem from '../../components/profile/UserItem';
import SelectedUsers from '../../components/profile/SelectedUsers';
import {useSearchUsers} from '../../hooks/searchHooks';
import {useGetUserFollowings} from '../../hooks/userHooks';

const Followers = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const {
    dispatch,
    store: {selectedUsers},
  } = useStore();

  const {bold, font16, pl15, pr15, pb10, pt10} = common;

  const {data, refetch, isFetching} = useGetUserFollowings();

  const handleSearchUsers = useSearchUsers(profiles =>
    setSearchResult(
      profiles?.map(profile => ({...profile, user_id: profile.id})),
    ),
  );

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
