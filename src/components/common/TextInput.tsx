import {
  Keyboard,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import {Theme, useColors} from '../../hooks/customHooks';
import {useRef} from 'react';

type TextInputProps = RNTextInputProps & {
  theme?: Theme;
};

const TextInput = ({style, theme, ...rest}: TextInputProps) => {
  const {color, backgroundColor, theme: appTheme} = useColors();
  // const ref = useRef<RNTextInput>(null);

  return (
    <RNTextInput
      // ref={ref}
      style={[
        {
          color: theme ? theme.color : color,
          backgroundColor: theme ? theme.backgroundColor : backgroundColor,
          fontFamily: 'Karla',
          fontSize: 16,
          padding: 10,
        },

        style,
      ]}
      placeholderTextColor={
        appTheme === 'dark' ? 'rgb(90, 90, 90)' : 'lightgray'
      }
      onPressOut={e => {
        // if (ref.current?.isFocused() && Keyboard.isVisible()) {
        // e.preventDefault();
        // Keyboard.dismiss();
        // }
      }}
      {...rest}
    />
  );
};

export default TextInput;
