import {View, Text} from 'react-native';
import common from '../styles/sharedStyles';

const Stories = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>Stories Under construction!</Text>
    </View>
  );
};

export default Stories;
