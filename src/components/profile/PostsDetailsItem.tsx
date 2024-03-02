import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import common from '../../styles/sharedStyles';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserLike from '../common/UserLike';
import UserComment from '../common/UserComment';
import Followers from '../../views/profile/Followers';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const PostsDetailsItem = ({item}) => {
  const navigation = useNavigation();

  const {
    flex1,
    p1,
    jcSpaceBetween,
    jcSpaceAround,
    cGap10,
    row,
    aiCenter,
    ph15,
    pv10,
    bold,
  } = common;

  return (
    <View style={[]}>
      <View style={[row, aiCenter, jcSpaceBetween, ph15, pv10]}>
        <View style={[row, aiCenter, cGap10]}>
          <MaterialIcons name="account-circle" size={30} color="lightgray" />
          <Text style={bold}>{item.username}</Text>
        </View>

        <View style={[row, cGap10]}>
          <MaterialCommunityIcons
            name="bookmark"
            onPress={() => Alert.alert('Under construction')}
            size={24}
            color="dodgerblue"
          />

          <MaterialCommunityIcons
            name="dots-horizontal"
            size={24}
            onPress={() => Alert.alert('Under construction')}
          />
        </View>
      </View>

      <View style={styles.container}>
        <FastImage
          style={styles.image}
          source={{
            uri: item.filename,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={[row, jcSpaceAround, pv10]}>
        <UserLike item={item} type={item.type} />
        <UserComment item={item} />
        <MaterialCommunityIcons
          name="share-outline"
          size={22}
          color="gray"
          onPress={() =>
            navigation.navigate(Followers.name, {id: item.id, type: item.type})
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowWidth, // Adjust the percentage as needed
    aspectRatio: 1, // Maintain the aspect ratio of the image
  },
});

export default PostsDetailsItem;
