import {Text} from 'react-native';
import common from '../../styles/sharedStyles';

const Emoji = ({emoji, onPress}) => {
  const {font20} = common;
  return (
    <Text
      style={font20}
      onPress={() => {
        onPress(prev => prev + emoji);
      }}>
      {emoji}
    </Text>
  );
};

export default Emoji;
