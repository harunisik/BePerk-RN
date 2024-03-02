import {StyleSheet, View} from 'react-native';
import common from '../../styles/sharedStyles';
import FastImage from 'react-native-fast-image';
// import {useMemo} from 'react';

const PostItem = ({item}) => {
  const {flex1, p1} = common;
  // const randomBool = useMemo(() => Math.random() < 0.5, []);

  return (
    <View style={[flex1, p1]}>
      {item.filename && (
        <FastImage
          style={styles.image}
          source={{
            uri: item.filename,
          }}
          // resizeMode={FastImage.resizeMode.cover}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 120,
  },
});

export default PostItem;
