import {View} from 'react-native';
import {Fragment} from 'react';
import Video from '../../components/common/Video';
import LikeButtton from '../../components/common/buttons/LikeButton';
import CommentButton from '../../components/common/buttons/CommentButton';
import BookmarkButton from '../../components/common/buttons/BookmarkButton';
import ShareButton from '../../components/common/buttons/ShareButton';
import DotsButton from '../../components/common/buttons/DotsButton';
import AccountButton from '../../components/common/buttons/AccountButton';

const ForYouPagerItem = ({item, paused}) => {
  return (
    <Fragment>
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
          }}>
          <AccountButton item={item} color="white" size={40} vertical />
        </View>
        <View style={{rowGap: 25}}>
          <LikeButtton
            item={item}
            type={item.type}
            size={28}
            color="white"
            vertical
          />
          <CommentButton item={item} size={28} color="white" vertical />
          <BookmarkButton item={item} size={28} color="white" />
          <ShareButton item={item} size={28} color="white" />
          <DotsButton item={item} size={28} color="white" />
        </View>
      </View>
    </Fragment>
  );
};

export default ForYouPagerItem;
