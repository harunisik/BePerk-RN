import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import common from '../../styles/sharedStyles';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {p1} = common;

export const VIDEO_HEIGHT = 240;
export const IMAGE_HEIGHT = 120;

interface PostItemProps {
  item: any;
  onPress: () => void;
  imageHeight?: number;
  videoHeight?: number;
}

const PostItem = ({
  item,
  onPress,
  imageHeight = IMAGE_HEIGHT,
  videoHeight = VIDEO_HEIGHT,
}: PostItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[p1]}>
        <FastImage
          style={{height: item.type === 1 ? imageHeight : videoHeight}}
          source={{
            uri: item.type === 1 ? item.filename : item.cover,
          }}
        />
        {item.type === 0 && (
          <MaterialIcons
            name="ondemand-video"
            size={20}
            style={styles.videoIcon}
            color="white"
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  videoIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default PostItem;
