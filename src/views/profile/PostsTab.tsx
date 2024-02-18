import {View, Text} from 'react-native';
import common from '../../styles/sharedStyles';

const PostsTab = () => {
  const {flex1, jcCenter, aiCenter, dashed} = common;

  // "GET /user/getPhotoVideo?id=170763&limit=50&offset=0 HTTP/1.1" 200 5931
  return (
    <View style={[flex1, jcCenter, aiCenter, dashed]}>
      <Text>Posts Under construction!</Text>
    </View>
  );
};

export default PostsTab;
