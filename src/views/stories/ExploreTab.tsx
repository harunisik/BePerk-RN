import {Text, View} from 'react-native';
import common from '../../styles/sharedStyles';

const ExploreTab = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>Explore is under construction!</Text>
    </View>
  );
};

export default ExploreTab;
