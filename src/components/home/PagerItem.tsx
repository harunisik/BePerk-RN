import {Text, View} from 'react-native';
import Video from '../common/Video';
import LikeButtton from '../common/buttons/LikeButton';
import CommentButton from '../common/buttons/CommentButton';
import BookmarkButton from '../common/buttons/BookmarkButton';
import ShareButton from '../common/buttons/ShareButton';
import DotsButton from '../common/buttons/DotsButton';
import AccountCard from '../common/AccountCard';

const PagerItem = ({item, paused = true}) => {
  return (
    <>
      <Video uri={item.filename} paused={paused} fullscreen />
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
            color="white"
            labelColor="white"
            size={30}
            vertical
          />
          <Text style={{color: 'white'}}>{item.caption}</Text>
        </View>
        <View style={{rowGap: 25}}>
          <LikeButtton
            id={item.id}
            liked={item.liked}
            likesCount={item.likes_count}
            type={item.type}
            size={28}
            color="white"
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
            size={28}
            color="white"
            vertical
          />
          <BookmarkButton
            id={item.id}
            type={item.type}
            isSaved={item.bookmark}
            size={28}
            color="white"
          />
          <ShareButton id={item.id} type={item.type} size={28} color="white" />
          <DotsButton
            id={item.id}
            type={item.type}
            userId={item.user_id}
            username={item.username}
            size={28}
            color="white"
          />
        </View>
      </View>
    </>
  );
};

export default PagerItem;
