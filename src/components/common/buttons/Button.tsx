import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../../styles/sharedStyles';
import {ReactElement} from 'react';

interface ButtonProps {
  title: string;
  icon?: string;
  iconColor?: string;
  onPress: () => void;
  iconComponent?: ReactElement;
}

const Button = ({
  title,
  icon,
  iconColor = 'dodgerblue',
  onPress = () => {},
  iconComponent,
}: ButtonProps) => {
  const {aiCenter, cGap15, row} = common;

  return (
    <TouchableOpacity
      style={[styles.button, aiCenter, row, cGap15]}
      onPress={onPress}>
      {iconComponent ? (
        iconComponent
      ) : icon ? (
        <MaterialCommunityIcons name={icon} size={26} color={iconColor} />
      ) : (
        ''
      )}
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    // paddingLeft: 70,
    margin: 10,
  },
});

export default Button;
