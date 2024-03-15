import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import common from '../../styles/sharedStyles';
import FastImage from 'react-native-fast-image';
import {Fragment} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PostItem = ({item, onPress}) => {
  const {flex1, p1} = common;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[flex1, p1]}>
        {item.type === 1 ? (
          <FastImage
            style={styles.image}
            source={{
              uri: item.filename,
            }}
          />
        ) : item.type === 0 ? (
          <View style={flex1}>
            {/* <Video source={{uri: item.filename}} paused style={flex1} /> */}
            <FastImage
              style={styles.image}
              source={{
                uri: item.cover,
              }}
            />
            <MaterialIcons
              name="ondemand-video"
              size={20}
              style={styles.videoIcon}
              color="white"
            />
          </View>
        ) : (
          <Fragment />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 120,
  },
  videoIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default PostItem;
