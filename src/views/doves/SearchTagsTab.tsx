import {Alert} from 'react-native';
import {useState} from 'react';
import {useSearchHashTagCount, useSearchText} from '../../hooks/searchHooks';
import common from '../../styles/sharedStyles';
import FlatList from '../../components/common/FlatList';
import Text from '../../components/common/Text';

const SearchTagsTab = ({searchText}) => {
  const [searchResult, setSearchResult] = useState([]);
  const {bold} = common;

  const handleSearchHashtags = useSearchHashTagCount();

  const handlePressItem = () => {
    Alert.alert('under construction');
  };

  useSearchText(
    searchText,
    () =>
      handleSearchHashtags.mutate(
        {
          limit: 50,
          offset: 0,
          hashtag: searchText,
          filter: 0,
        },
        {
          onSuccess: ({hashtags}) =>
            setSearchResult(
              hashtags?.map(hashtag => ({...hashtag, user_id: hashtag.id})),
            ),
        },
      ),
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
    />
  );
};
export default SearchTagsTab;
