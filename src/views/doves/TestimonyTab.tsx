import {View, Text} from 'react-native';
import common from '../../styles/sharedStyles';

const TestimonyTab = () => {
  const {flex1, jcCenter, aiCenter, dashed} = common;

  return (
    <View style={[flex1, jcCenter, aiCenter, dashed]}>
      <Text>Doves testimony Under construction!</Text>
    </View>
  );
};

export default TestimonyTab;
