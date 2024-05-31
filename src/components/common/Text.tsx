import {Text as RNText, TextProps} from 'react-native';
import {useColors} from '../../hooks/customHooks';

const Text = ({style, ...rest}: TextProps) => {
  const {color} = useColors();

  return (
    <RNText
      style={[{fontFamily: 'Karla-Regular', fontSize: 17, color}, style]}
      {...rest}
    />
  );
};

export default Text;
