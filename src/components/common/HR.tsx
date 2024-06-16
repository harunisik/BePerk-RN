import {StyleSheet, ViewProps as RNViewProps} from 'react-native';
import View from './View';

type ViewProps = RNViewProps & {color?: string};

const HR = ({style, color, ...rest}: ViewProps) => {
  const _color = color ?? 'rgb(50,50,50)';

  return (
    <View
      style={[
        {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: _color,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default HR;
