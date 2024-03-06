import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import common from '../../styles/sharedStyles';
import FastImage from 'react-native-fast-image';

const PostItem = ({item, onPress}) => {
  const {flex1, p1} = common;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[flex1, p1]}>
        {item.filename && (
          <FastImage
            style={styles.image}
            source={{
              uri: item.filename,
            }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 120,
  },
});

export default PostItem;
