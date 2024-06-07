import {useEffect, useState} from 'react';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {postBookmarks as userPostBookmarks} from '../../../services/UserService';
import {BookmarkIcon} from '../Icons';

interface BookmarkButtonProps {
  id: number;
  type: number;
  isSaved: number;
  iconSize?: number;
  color?: string;
}

const BookmarkButton = ({
  id,
  type,
  isSaved,
  iconSize,
  color,
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
    <BookmarkIcon
      onPress={handlePress}
      isOutlined={bookmark === 0}
      size={iconSize}
      color={color}
    />
  );
};

export default BookmarkButton;
