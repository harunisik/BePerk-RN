import {Pressable, TextStyle, ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../../styles/sharedStyles';
import {ReactElement, isValidElement} from 'react';
import Text from '../Text';
import {Theme, useColors} from '../../../hooks/customHooks';

const {aiCenter, cGap10, row, p10} = common;

interface ButtonProps {
  title: string;
  icon?: string | ReactElement;
  onPress?: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  theme?: Theme;
  iconColor?: string;
}

const Button = ({
  title,
  icon,
  onPress = () => {},
  style,
  labelStyle,
  theme,
  iconColor,
}: ButtonProps) => {
  const {theme1} = useColors();
  const _theme = theme ?? theme1;

  return (
    <Pressable
      style={[
        row,
        aiCenter,
        cGap10,
        p10,
        {
          backgroundColor: _theme.backgroundColor,
          borderRadius: 20,
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onPress}>
      {isValidElement(icon) ? (
        icon
      ) : typeof icon === 'string' ? (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={iconColor ?? _theme.color}
        />
      ) : (
        ''
      )}
      <Text style={[{color: _theme.color}, labelStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;
