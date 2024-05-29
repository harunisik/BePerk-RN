import {Text as RNText, TextProps} from 'react-native';

const Text = ({style, ...rest}: TextProps) => {
  return (
    <RNText
      style={[{fontFamily: 'Karla-Regular', fontSize: 16}, style]}
      {...rest}
    />
  );
};

export default Text;
