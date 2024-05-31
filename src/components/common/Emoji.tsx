import Text from './Text';

const Emoji = ({emoji, onPress}) => {
  return (
    <Text
      onPress={() => {
        onPress(prev => prev + emoji);
      }}>
      {emoji}
    </Text>
  );
};

export default Emoji;
