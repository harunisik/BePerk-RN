import {Switch} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useState} from 'react';
import Text from '../../../components/common/Text';
import View from '../../../components/common/View';

const DarkMode = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {row, jcSpaceBetween, aiCenter} = common;

  return (
    <View style={[row, jcSpaceBetween, aiCenter]}>
      <Text>Dark-Mode</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
};

export default DarkMode;
