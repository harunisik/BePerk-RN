import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import {usePostBookmarks} from '../../../hooks/userHooks';
import {useRoute} from '@react-navigation/native';

const BookmarkButton = ({item}) => {
  const [bookmark, setBookmark] = useState(item.bookmark);
  const route = useRoute();

  const handleLike = usePostBookmarks(route.name);

  useEffect(() => {
    setBookmark(item.bookmark);
  }, [item]);

  return (
    <MaterialCommunityIcons
      name={bookmark ? 'bookmark' : 'bookmark-outline'}
      size={24}
      onPress={() =>
        handleLike.mutate(
          {
            id: item.id,
            type: item.type,
            bookmark: bookmark ? 0 : 1,
          },
          {
            onSuccess: () => {
              setBookmark(bookmark ? 0 : 1);
            },
          },
        )
      }
      color="dodgerblue"
    />
  );
};

export default BookmarkButton;
