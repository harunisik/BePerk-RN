import {StyleSheet, ViewProps} from 'react-native';
import View from './View';

const HR = ({style, ...rest}: ViewProps) => {
  return (
    <View
      style={[
        {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: 'gray',
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default HR;
