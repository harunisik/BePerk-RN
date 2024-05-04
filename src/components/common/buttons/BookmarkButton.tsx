import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import {useCustomMutation as useMutation} from '../../../hooks/customHooks';
import {postBookmarks as userPostBookmarks} from '../../../services/UserService';

interface BookmarkButtonProps {
  item: any;
  size?: number;
  color?: string;
}

const BookmarkButton = ({
  item,
  size = 24,
  color = 'dodgerblue',
}: BookmarkButtonProps) => {
  const [bookmark, setBookmark] = useState(item.bookmark);
  const postBookmarks = useMutation(userPostBookmarks);

  const handlePress = () =>
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
    );

  useEffect(() => {
    setBookmark(item.bookmark);
  }, [item]);

  return (
    <MaterialCommunityIcons
      name={bookmark ? 'bookmark' : 'bookmark-outline'}
      size={size}
      color={color}
      onPress={handlePress}
    />
  );
};

export default BookmarkButton;
