import {View as RNView, ViewProps} from 'react-native';
import {useColors} from '../../hooks/customHooks';

const View = ({style, ...rest}: ViewProps) => {
  const {backgroundColor} = useColors();

  return <RNView style={[{backgroundColor}, style]} {...rest} />;
};

export default View;
