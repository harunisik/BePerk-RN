import {View, Text, Switch} from 'react-native';
import common from '../../styles/sharedStyles';
import {useState} from 'react';

const DarkMode = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {row, spaceBetween, center} = common;

  return (
    <View style={[row, spaceBetween, center]}>
      <Text>Dark-Mode</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
};

export default DarkMode;
