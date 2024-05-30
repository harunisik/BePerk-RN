import {View as ViewRN, ViewProps} from 'react-native';
import {useColors} from '../../hooks/customHooks';

const View = ({style, ...rest}: ViewProps) => {
  const {backgroundColor} = useColors();

  return <ViewRN style={[{backgroundColor}, style]} {...rest} />;
};

export default View;
