import {View, Text, Switch} from 'react-native';
import common from '../../styles/sharedStyles';
import {useState} from 'react';

const NewPosts = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {row, spaceBetween, center} = common;

  return (
    <View style={[row, spaceBetween, center]}>
      <Text>New posts</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
};

export default NewPosts;
