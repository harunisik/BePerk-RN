import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useCustomMutation as useMutation} from '../../../hooks/commonHooks';
import {postBookmarks as userPostBookmarks} from '../../../services/UserService';

const BookmarkButton = ({item}) => {
  const [bookmark, setBookmark] = useState(item.bookmark);
  const route = useRoute();

  const postBookmarks = useMutation(userPostBookmarks, route.key);

  useEffect(() => {
    setBookmark(item.bookmark);
  }, [item]);

  return (
    <MaterialCommunityIcons
      name={bookmark ? 'bookmark' : 'bookmark-outline'}
      size={24}
      onPress={() =>
        postBookmarks.mutate(
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
