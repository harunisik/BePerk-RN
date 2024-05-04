import {useState} from 'react';
import UserItem from '../../components/profile/UserItem';
import {useSearchText, useSearchUsers} from '../../hooks/searchHooks';
import {useNavigation} from '@react-navigation/native';
import ProfileStack from '../profile/ProfileStack';
import FlatList from '../../components/common/FlatList';

const SearchProfilesTab = ({searchText}) => {
  const [searchResult, setSearchResult] = useState([]);
  const navigation = useNavigation();

  const searchUsers = useSearchUsers();

  const handlePressItem = item => {
    navigation.navigate(ProfileStack.name, {
      headerBackVisible: true,
      userId: item.user_id,
      username: item.username,
    });
  };

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
    <FlatList
      data={searchResult}
      renderItem={({item}) => (
        <UserItem item={item} onPress={item => handlePressItem(item)} />
      )}
    />
  );
};

export default SearchProfilesTab;
