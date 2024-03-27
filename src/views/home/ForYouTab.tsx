import {Text, View} from 'react-native';
import common from '../../styles/sharedStyles';

const ForYouTab = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>For You is under construction!</Text>
    </View>
  );
};

export default ForYouTab;
