import {TextInput as RNTextInput, TextInputProps} from 'react-native';
import {useColors} from '../../hooks/customHooks';

const TextInput = ({style, ...rest}: TextInputProps) => {
  const {color, theme} = useColors();

  return (
    <RNTextInput
      style={[
        {
          color,
          backgroundColor:
            theme === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(211, 211, 211, 0.5)',
          borderRadius: 20,
          padding: 15,
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
