import {View, Text, TextInput, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import UserItem from '../../components/profile/UserItem';
import SelectedUsers from '../../components/profile/SelectedUsers';
import {useSearchText, useSearchUsers} from '../../hooks/searchHooks';
import {useNavigation} from '@react-navigation/native';
import {useCustomQuery as useQuery} from '../../hooks/customHooks';
import {getUserFollowings} from '../../services/UserService';
import FlatList from '../../components/common/FlatList';

const Followers = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigation = useNavigation();

  const {bold, font16, pl15, pr15, pb10, pt10} = common;

  const {data, refetch, isFetching} = useQuery(getUserFollowings);

  const searchUsers = useSearchUsers();

  const handlePressUserItem = (item, isSelected) => {
    setSelectedUsers(prev => {
      if (isSelected) {
        return [...prev, item];
      }
      return prev.filter(({user_id}) => user_id !== item.user_id);
    });
  };

  useEffect(() => {
    navigation.setParams({selectedUsers});
  }, [selectedUsers]);

  useSearchText(
    searchText,
    () =>
      searchUsers.mutate(
        {limit: 50, offset: 0, username: searchText},
        {
          onSuccess: ({profiles}) =>
            setSearchResult(
              profiles?.map(profile => ({...profile, user_id: profile.id})),
            ),
        },
      ),
    () => setSearchResult([]),
  );

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
          renderItem={({item}) => (
            <UserItem item={item} onPress={handlePressUserItem} selectable />
          )}
          keyExtractor={item => item.user_id}
        />
      ) : (
        <FlatList
          data={data?.following}
          renderItem={({item}) => (
            <UserItem item={item} onPress={handlePressUserItem} selectable />
          )}
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
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Followers;
