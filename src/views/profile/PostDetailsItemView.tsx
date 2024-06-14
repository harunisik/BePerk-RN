import {useRoute} from '@react-navigation/native';
import PostDetailItem from '../../components/profile/PostDetailItem';
import View from '../../components/common/View';

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
      width,
      height,
      subscribed,
    },
  } = route;

  return (
    <View style={{flex: 1}}>
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
        width={width}
        height={height}
        subscribed={subscribed}
      />
    </View>
  );
};

export default PostDetailItemView;
