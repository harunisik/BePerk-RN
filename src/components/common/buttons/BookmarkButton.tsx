import {useEffect, useState} from 'react';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {postBookmarks as userPostBookmarks} from '../../../services/UserService';
import {BookmarkIcon} from '../Icons';

interface BookmarkButtonProps {
  id: number;
  type: number;
  isSaved: number;
}

const BookmarkButton = ({id, type, isSaved}: BookmarkButtonProps) => {
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

  return <BookmarkIcon onPress={handlePress} isOutlined={bookmark === 0} />;
};

export default BookmarkButton;
