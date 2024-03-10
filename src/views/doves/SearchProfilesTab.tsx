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

  const searchUsers = useSearchUsers();

  const handlePressItem = item => {
    navigation.navigate(Profile.name, {
      userId: item.user_id,
      username: item.username,
    });
  };

  useSearchText(
    searchText,
    () =>
      searchUsers.mutate(
        {
          limit: 50,
          offset: 0,
          username: searchText,
        },
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
