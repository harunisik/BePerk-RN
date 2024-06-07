import {Text as RNText, TextProps as RNTextProps} from 'react-native';
import {useColors} from '../../hooks/customHooks';

type TextProps = RNTextProps & {color?: string; size?: number};

const Text = ({style, color, size, ...rest}: TextProps) => {
  const {color: themeColor} = useColors();
  const _color = color ?? themeColor;

  return (
    <RNText
      style={[
        {fontFamily: 'Karla-Regular', fontSize: size ?? 17, color: _color},
        style,
      ]}
      {...rest}
    />
  );
};

export default Text;
