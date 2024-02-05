import {View, Text, Switch} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useState} from 'react';

const Messages = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {row, jcSpaceBetween, aiCenter} = common;

  return (
    <View style={[row, jcSpaceBetween, aiCenter]}>
      <Text>Messages</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
};

export default Messages;
