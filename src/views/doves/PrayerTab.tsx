import {View, Text} from 'react-native';
import common from '../../styles/sharedStyles';

const PrayerTab = () => {
  const {flex1, jcCenter, aiCenter, dashed} = common;

  return (
    <View style={[flex1, jcCenter, aiCenter, dashed]}>
      <Text>Doves prayer Under construction!</Text>
    </View>
  );
};

export default PrayerTab;