import Text from './Text';

const Emoji = ({emoji, onPress, size}) => {
  return (
    <Text
      size={size}
      onPress={() => {
        onPress(prev => prev + emoji);
      }}>
      {emoji}
    </Text>
  );
};

export default Emoji;
