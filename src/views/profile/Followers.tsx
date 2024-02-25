import {View, Text, TextInput, StyleSheet, FlatList} from 'react-native';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import UserItem from '../../components/profile/UserItem';
import SelectedUsers from '../../components/profile/SelectedUsers';
import {useSearchUsers} from '../../hooks/searchHooks';
import {useGetUserFollowings} from '../../hooks/userHooks';
import ItemSeperator from '../../components/common/ItemSpearator';

const Followers = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const {bold, font16, pl15, pr15, pb10, pt10} = common;

  const {data, refetch, isFetching} = useGetUserFollowings();

  const handleSearchUsers = useSearchUsers(profiles =>
    setSearchResult(
      profiles?.map(profile => ({...profile, user_id: profile.id})),
    ),
  );

  const handlePressUserItem = (item, isSelected) => {
    setSelectedUsers(prev => {
      if (isSelected) {
        return [...prev, item];
      }
      return prev.filter(({user_id}) => user_id !== item.user_id);
    });
  };

  useEffect(() => {
    navigation.setParams({
      selectedUsers,
    });
  }, [selectedUsers]);

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
          ItemSeparatorComponent={ItemSeperator}
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
          ItemSeparatorComponent={ItemSeperator}
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
