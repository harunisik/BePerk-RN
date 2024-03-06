import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import {usePostBookmarks} from '../../../hooks/userHooks';

const BookmarkButton = ({item}) => {
  const [bookmark, setBookmark] = useState(item.bookmark);

  const handleLike = usePostBookmarks(() => {
    setBookmark(bookmark ? 0 : 1);
  });

  useEffect(() => {
    setBookmark(item.bookmark);
  }, [item]);

  return (
    <MaterialCommunityIcons
      name={bookmark ? 'bookmark' : 'bookmark-outline'}
      size={24}
      onPress={() =>
        handleLike.mutate({
          id: item.id,
          type: item.type,
          bookmark: bookmark ? 0 : 1,
        })
      }
      color="dodgerblue"
    />
  );
};

export default BookmarkButton;
