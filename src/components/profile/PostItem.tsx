import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import common from '../../styles/sharedStyles';
import FastImage from 'react-native-fast-image';
import {Fragment} from 'react';

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
          <Text>{item.filename}</Text>
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
});

export default PostItem;
