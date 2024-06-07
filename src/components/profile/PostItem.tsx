import {Pressable, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import FastImage from 'react-native-fast-image';
import View from '../common/View';
import {VideoIcon} from '../common/Icons';

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
    <Pressable onPress={onPress}>
      <View style={[p1]}>
        <FastImage
          style={{height: item.type === 1 ? imageHeight : videoHeight}}
          source={{
            uri: item.type === 1 ? item.filename : item.cover,
          }}
        />
        {item.type === 0 && (
          <VideoIcon style={styles.videoIcon} size={20} color="white" />
        )}
      </View>
    </Pressable>
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
