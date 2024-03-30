import {Animated, View} from 'react-native';
import common from '../../styles/sharedStyles';
import PagerView from 'react-native-pager-view';
import {getVideoFeed} from '../../services/UserService';
import {useCustomQuery} from '../../hooks/commonHooks';
import {Fragment, useState} from 'react';
import Video from '../../components/common/Video';
import LikeButtton from '../../components/common/buttons/LikeButton';
import CommentButton from '../../components/common/buttons/CommentButton';
import BookmarkButton from '../../components/common/buttons/BookmarkButton';
import ShareButton from '../../components/common/buttons/ShareButton';
import DotsButton from '../../components/common/buttons/DotsButton';
import AccountButton from '../../components/common/buttons/AccountButton';

const {flex1} = common;

const PagerItem = ({item, paused}) => {
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

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ForYouTab = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {data} = useCustomQuery(getVideoFeed, {
    filter: 1,
    limit: 10,
    offset: 0,
  });

  return (
    <View style={flex1}>
      {data && (
        <AnimatedPagerView
          style={flex1}
          initialPage={0}
          orientation="vertical"
          onPageScroll={event => {
            setCurrentIndex(event.nativeEvent.position);
          }}>
          {data?.feed.map((item, index) => (
            <View key={item.id} collapsable={false}>
              <PagerItem item={item} paused={index !== currentIndex} />
            </View>
          ))}
        </AnimatedPagerView>
      )}
    </View>
  );
};

export default ForYouTab;
