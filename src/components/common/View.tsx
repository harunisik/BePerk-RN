import {View as RNView, ViewProps as RNViewProps} from 'react-native';
import {useColors} from '../../hooks/customHooks';

type ViewProps = RNViewProps & {
  disableTheme?: boolean;
};

const View = ({style, disableTheme = false, ...rest}: ViewProps) => {
  const {backgroundColor} = useColors();

  return (
    <RNView style={[!disableTheme && {backgroundColor}, style]} {...rest} />
  );
};

export default View;
