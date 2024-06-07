import {View as RNView, ViewProps as RNViewProps} from 'react-native';
import {useColors} from '../../hooks/customHooks';

type ViewProps = RNViewProps & {
  backgroundColor?: string;
  disableTheme?: boolean;
};

const View = ({
  style,
  backgroundColor,
  disableTheme = false,
  ...rest
}: ViewProps) => {
  const {backgroundColor: themeBackGroundColor} = useColors();
  const _backgroundColor = backgroundColor ?? themeBackGroundColor;

  return (
    <RNView
      style={[!disableTheme && {backgroundColor: _backgroundColor}, style]}
      {...rest}
    />
  );
};

export default View;
