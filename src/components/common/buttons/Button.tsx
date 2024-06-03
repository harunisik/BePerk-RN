import {Pressable, ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../../styles/sharedStyles';
import {ReactElement, isValidElement} from 'react';
import Text from '../Text';
import {useColors} from '../../../hooks/customHooks';

const {aiCenter, cGap15, row, p10} = common;

interface ButtonProps {
  title: string;
  icon?: string | ReactElement;
  onPress?: () => void;
  style?: ViewStyle;
}

const Button = ({title, icon, onPress = () => {}, style}: ButtonProps) => {
  const {color2: color, backgroundColor2: backgroundColor} = useColors();

  return (
    <Pressable
      style={[
        row,
        aiCenter,
        cGap15,
        p10,
        {
          backgroundColor: backgroundColor,
          borderRadius: 20,
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onPress}>
      {isValidElement(icon) ? (
        icon
      ) : typeof icon === 'string' ? (
        <MaterialCommunityIcons name={icon} size={26} color={color} />
      ) : (
        ''
      )}
      <Text style={{color}}>{title}</Text>
    </Pressable>
  );
};

export default Button;
