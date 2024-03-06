import {Alert} from 'react-native';
import Button from './Button';

const TurnOffButton = ({item}) => {
  return (
    <Button
      onPress={() => Alert.alert('under construction')}
      icon="bell-off-outline"
      title="Turn off Post Notifications"
    />
  );
};

export default TurnOffButton;
