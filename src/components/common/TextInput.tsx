import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import {Theme, useColors} from '../../hooks/customHooks';

type TextInputProps = RNTextInputProps & {
  theme?: Theme;
};

const TextInput = ({style, theme, ...rest}: TextInputProps) => {
  const {color, backgroundColor} = useColors();

  return (
    <RNTextInput
      style={[
        {
          color: theme ? theme.color : color,
          backgroundColor: theme ? theme.backgroundColor : backgroundColor,
          fontFamily: 'Karla',
          fontSize: 17,
          padding: 10,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default TextInput;
