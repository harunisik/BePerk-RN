import {Alert, FlatList, Text} from 'react-native';
import {useState} from 'react';
import {useSearchHashTagCount, useSearchText} from '../../hooks/searchHooks';
import ItemSeperator from '../../components/common/ItemSpearator';
import common from '../../styles/sharedStyles';

const SearchTagsTab = ({searchText}) => {
  const [searchResult, setSearchResult] = useState([]);
  const {bold} = common;

  const handleSearchHashtags = useSearchHashTagCount(profiles =>
    setSearchResult(
      profiles?.map(profile => ({...profile, user_id: profile.id})),
    ),
  );

  const handlePressItem = () => {
    Alert.alert('under construction');
  };

  useSearchText(
    searchText,
    () =>
      handleSearchHashtags.mutate({
        limit: 50,
        offset: 0,
        hashtag: searchText,
        filter: 0,
      }),
    () => setSearchResult([]),
  );

  return (
    <FlatList
      data={searchResult}
      renderItem={({item}) => (
        <Text style={bold} onPress={handlePressItem}>
          {item.hashtag}
        </Text>
      )}
      keyExtractor={item => item.hashtag}
      ItemSeparatorComponent={<ItemSeperator medium />}
    />
  );
};
export default SearchTagsTab;
