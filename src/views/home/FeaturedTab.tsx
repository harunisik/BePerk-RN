import {Text, View} from 'react-native';
import common from '../../styles/sharedStyles';

const FeaturedTab = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>Featured is under construction!</Text>
    </View>
  );
};

export default FeaturedTab;
