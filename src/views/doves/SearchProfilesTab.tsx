import {FlatList} from 'react-native';
import {useState} from 'react';
import UserItem from '../../components/profile/UserItem';
import {useSearchText, useSearchUsers} from '../../hooks/searchHooks';
import ItemSeperator from '../../components/common/ItemSpearator';
import Profile from '../profile/Profile';
import {useNavigation} from '@react-navigation/native';

const SearchProfilesTab = ({searchText}) => {
  const [searchResult, setSearchResult] = useState([]);
  const navigation = useNavigation();

  const handleSearchUsers = useSearchUsers(profiles =>
    setSearchResult(
      profiles?.map(profile => ({...profile, user_id: profile.id})),
    ),
  );

  const handlePressItem = item => {
    navigation.navigate(Profile.name, {
      userId: item.user_id,
      username: item.username,
    });
  };

  useSearchText(
    searchText,
    () =>
      handleSearchUsers.mutate({
        limit: 50,
        offset: 0,
        username: searchText,
      }),
    () => setSearchResult([]),
  );

  return (
    <FlatList
      data={searchResult}
      renderItem={({item}) => (
        <UserItem item={item} onPress={item => handlePressItem(item)} />
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeperator}
    />
  );
};

export default SearchProfilesTab;
