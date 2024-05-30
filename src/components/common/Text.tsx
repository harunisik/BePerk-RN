import {Text as TextRN, TextProps} from 'react-native';
import {useColors} from '../../hooks/customHooks';

const Text = ({style, ...rest}: TextProps) => {
  const {color} = useColors();

  return (
    <TextRN
      style={[{fontFamily: 'Karla-Regular', fontSize: 16, color}, style]}
      {...rest}
    />
  );
};

export default Text;
