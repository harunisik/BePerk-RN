import {View, Text} from 'react-native';
import common from '../../styles/sharedStyles';

const StoriesTab = () => {
  const {flex1, jcCenter, aiCenter, dashed} = common;

  //   /my24?id=170763 HTTP/1.1" 200 11
  return (
    <View style={[flex1, jcCenter, aiCenter, dashed]}>
      <Text>Stories Under construction!</Text>
    </View>
  );
};

export default StoriesTab;
