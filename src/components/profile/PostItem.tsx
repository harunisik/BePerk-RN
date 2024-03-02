import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import common from '../../styles/sharedStyles';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import PostsDetails from '../../views/profile/PostsDetails';

const PostItem = ({item}) => {
  const navigation = useNavigation();
  const {flex1, p1} = common;

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(PostsDetails.name)}>
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
