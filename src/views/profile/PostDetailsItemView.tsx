import {useRoute} from '@react-navigation/native';
import PostDetailItem from '../../components/profile/PostDetailItem';

const PostDetailItemView = () => {
  const route = useRoute();
  const {
    params: {
      id,
      userId,
      username,
      fullname,
      type,
      bookmark,
      liked,
      likesCount,
      commentsCount,
      filename,
      caption,
      uploadTime,
    },
  } = route;

  return (
    <PostDetailItem
      id={id}
      type={type}
      userId={userId}
      username={username}
      fullname={fullname}
      caption={caption}
      bookmark={bookmark}
      filename={filename}
      liked={liked}
      likesCount={likesCount}
      commentsCount={commentsCount}
      uploadTime={uploadTime}
    />
  );
};

export default PostDetailItemView;
