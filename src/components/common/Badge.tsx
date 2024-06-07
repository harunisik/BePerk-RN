import React from 'react';
import Text from './Text';
import View from './View';
import {ViewProps as RNViewProps} from 'react-native';
import {Theme} from '../../hooks/customHooks';

type ViewProps = RNViewProps & {value: number; theme?: Theme};

const Badge = ({value, style, theme}: ViewProps) => {
  return (
    <View
      style={[
        {
          backgroundColor: theme ? theme.backgroundColor : 'red',
          borderRadius: 20,
          width: 15,
          height: 15,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      <Text size={11} color="white">
        {value}
      </Text>
    </View>
  );
};

export default Badge;
