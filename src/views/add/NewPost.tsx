import {View, Text, Alert} from 'react-native';
import common from '../../styles/sharedStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {flex1, aiCenter, jcCenter} = common;

const HeaderRight = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handlePressPost = () => {
    Alert.alert('under construction');
  };

  return (
    <Text style={{color: 'dodgerblue'}} onPress={handlePressPost}>
      Post
    </Text>
  );
};

export const NewPostScreenOptions = ({navigation}) => {
  return {
    title: 'New Post',
    headerLeft: () => (
      <MaterialCommunityIcons
        name="close"
        onPress={() => navigation.goBack()}
        size={26}
      />
    ),
    headerRight: HeaderRight,
  };
};

const NewPost = () => {
  const route = useRoute();
  const {
    params: {assets},
  } = route;
  const asset = assets[0];

  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>{asset.fileName}</Text>
      <Text>{asset.fileSize}</Text>
      <Text>{asset.type}</Text>
      <Text>{asset.uri}</Text>
      <Text>{asset.width}</Text>
    </View>
  );
};

export default NewPost;
