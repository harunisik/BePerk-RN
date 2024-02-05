import {View, Text, Switch} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useState} from 'react';

const Comments = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {row, jcSpaceBetween, aiCenter} = common;

  return (
    <View style={[row, jcSpaceBetween, aiCenter]}>
      <Text>Comments</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
};

export default Comments;
