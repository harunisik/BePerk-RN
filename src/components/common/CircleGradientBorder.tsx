import {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import View from './View';
import {useColors} from '../../hooks/customHooks';

const BORDER_WIDTH = 1.5;

const InnerView = ({borderRadius, children}) => {
  const {backgroundColor, theme2} = useColors();

  return (
    <View
      style={{
        borderRadius,
        backgroundColor: theme2.backgroundColor,
        borderColor: backgroundColor,
        borderWidth: BORDER_WIDTH,
      }}>
      {children}
    </View>
  );
};

const OuterView = ({onLayout, borderRadius, children}) => {
  const {theme2} = useColors();

  return (
    <View
      onLayout={onLayout}
      style={{
        borderRadius,
        borderColor: theme2.backgroundColor,
        borderWidth: BORDER_WIDTH,
      }}>
      {children}
    </View>
  );
};

const GradientOuterView = ({onLayout, borderRadius, children}) => {
  return (
    <LinearGradient
      colors={[
        '#00FFFF',
        '#17C8FF',
        '#329BFF',
        '#4C64FF',
        '#6536FF',
        '#8000FF',
      ]}
      onLayout={onLayout}
      style={{borderRadius, padding: BORDER_WIDTH}}>
      {children}
    </LinearGradient>
  );
};

const CircleGradientBorder = ({disabled = false, children}) => {
  const [borderRadius, setBorderRadius] = useState(0);
  const Outer = disabled ? OuterView : GradientOuterView;

  const handleLayout = (layoutEvent: LayoutChangeEvent) => {
    let {width, height} = layoutEvent.nativeEvent.layout;
    let dim = width > height ? width : height;

    setBorderRadius(dim / 2);
  };

  return (
    <Outer borderRadius={borderRadius} onLayout={handleLayout}>
      <InnerView borderRadius={borderRadius}>{children}</InnerView>
    </Outer>
  );
};

export default CircleGradientBorder;
