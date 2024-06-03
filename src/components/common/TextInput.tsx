import {TextInput as RNTextInput, TextInputProps} from 'react-native';
import {useColors} from '../../hooks/customHooks';

const TextInput = ({style, ...rest}: TextInputProps) => {
  const {color, backgroundColor} = useColors();

  return (
    <RNTextInput
      style={[
        {
          color,
          backgroundColor,
          fontFamily: 'Karla',
          fontSize: 17,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default TextInput;
