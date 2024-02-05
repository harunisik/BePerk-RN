import {View, Text, Switch} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useState} from 'react';

const PushNotifications = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {row, jcSpaceBetween, aiCenter} = common;

  return (
    <View style={[row, jcSpaceBetween, aiCenter]}>
      <Text>Enable push-notifications</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
};

export default PushNotifications;
