import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import {useMutation} from '../../../hooks/customHooks';
import {postBookmarks as userPostBookmarks} from '../../../services/UserService';

interface BookmarkButtonProps {
  id: number;
  type: number;
  isSaved: number;
  size?: number;
  color?: string;
}

const BookmarkButton = ({
  id,
  type,
  isSaved,
  size = 24,
  color = 'dodgerblue',
}: BookmarkButtonProps) => {
  const [bookmark, setBookmark] = useState(isSaved);
  const postBookmarks = useMutation(userPostBookmarks);

  const handlePress = () =>
    postBookmarks.mutate(
      {
        id: id,
        type: type,
        bookmark: bookmark ? 0 : 1,
      },
      {
        onSuccess: () => {
          setBookmark(bookmark ? 0 : 1);
        },
      },
    );

  useEffect(() => {
    setBookmark(isSaved);
  }, [isSaved]);

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
