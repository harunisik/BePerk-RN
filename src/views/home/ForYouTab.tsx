import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import common from '../../styles/sharedStyles';
import PagerView from 'react-native-pager-view';
import {getVideoFeed} from '../../services/UserService';
import {useCustomQuery} from '../../hooks/commonHooks';
import {SafeAreaView} from 'react-native';
import {useEffect, useMemo, useState} from 'react';
// import Video from '../../components/common/Video';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';

const {flex1, dashed} = common;

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ForYouTab = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const {data, refetch, isFetching} = useCustomQuery(getVideoFeed, {
    filter: 1,
    limit: 1,
    offset: 0,
  });

  useEffect(() => {
    return () => {
      setPaused(true);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {data && (
        <AnimatedPagerView
          // @ts-ignore
          testID="pager-view"
          style={styles.PagerView}
          initialPage={0}
          layoutDirection="ltr"
          pageMargin={10}
          // Lib does not support dynamically orientation change
          orientation="horizontal">
          {
            // useMemo(() =>
            data.feed.map((page, index) => (
              <View
                testID="pager-view-content"
                key={page.id}
                style={{
                  alignItems: 'center',
                  padding: 20,
                }}
                collapsable={false}>
                {/* <LikeCount /> */}
                <Text
                  testID={`pageNumber${index}`}>{`page number ${index}`}</Text>
                <Video
                  source={{uri: page.filename}}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
            ))
            // [navigationPanel.pages])
          }
        </AnimatedPagerView>
      )}
      {/* <NavigationPanel {...navigationPanel} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },
  PagerView: {
    flex: 1,
  },
});

export default ForYouTab;
