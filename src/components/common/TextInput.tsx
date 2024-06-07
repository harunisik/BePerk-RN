import {TextInput as RNTextInput, TextInputProps} from 'react-native';
import {useColors} from '../../hooks/customHooks';

const TextInput = ({style, ...rest}: TextInputProps) => {
  const {theme2} = useColors();

  return (
    <RNTextInput
      style={[
        {
          color: theme2.color,
          backgroundColor: theme2.backgroundColor,
          fontFamily: 'Karla',
          fontSize: 17,
          paddingVertical: 10,
          paddingHorizontal: 15,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default TextInput;
