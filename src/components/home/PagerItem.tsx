import Video from '../common/Video';
import LikeButtton from '../common/buttons/LikeButton';
import CommentButton from '../common/buttons/CommentButton';
import BookmarkButton from '../common/buttons/BookmarkButton';
import ShareButton from '../common/buttons/ShareButton';
import DotsButton from '../common/buttons/DotsButton';
import AccountCard from '../common/AccountCard';
import Text from '../common/Text';
import {View} from 'react-native';
// imports View from '../common/View';

const PagerItem = ({item, paused = true}) => {
  return (
    <View>
      <Video uri={item.filename} paused={paused} />
      <View
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: 10,
        }}>
        <View
          style={{
            alignSelf: 'flex-end',
            width: '70%',
            rowGap: 10,
            alignItems: 'flex-start',
          }}>
          <AccountCard
            userId={item.user_id}
            username={item.fullname}
            // photo={item.cover}
            // color="white"
            // labelColor="white"
            size={30}
            vertical
          />
          <Text>{item.caption}</Text>
        </View>
        <View style={{rowGap: 25}}>
          <LikeButtton
            id={item.id}
            liked={item.liked}
            likesCount={item.likes_count}
            type={item.type}
            vertical
          />
          <CommentButton
            id={item.id}
            fullname={item.fullname}
            username={item.username}
            userId={item.user_id}
            caption={item.caption}
            type={item.type}
            commentsCount={item.comments_count}
            uploadTime={item.upload_time}
            vertical
          />
          <BookmarkButton
            id={item.id}
            type={item.type}
            isSaved={item.bookmark}
          />
          <ShareButton id={item.id} type={item.type} />
          <DotsButton
            id={item.id}
            type={item.type}
            userId={item.user_id}
            username={item.username}
          />
        </View>
      </View>
    </View>
  );
};

export default PagerItem;
