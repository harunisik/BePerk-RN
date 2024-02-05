import {View, Text} from 'react-native';
import common from '../styles/sharedStyles';

const Doves = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>Doves Under construction!</Text>
    </View>
  );
};

export default Doves;
