import {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import View from './View';

const BORDER_WIDTH = 1.5;

const InnerView = ({borderRadius, children}) => {
  return (
    <View
      style={{
        borderRadius,
        // backgroundColor: 'lightgray',
        // borderColor: 'white',
        borderWidth: BORDER_WIDTH,
      }}>
      {children}
    </View>
  );
};

const OuterView = ({onLayout, borderRadius, children}) => {
  return (
    <View
      onLayout={onLayout}
      style={{
        borderRadius,
        borderColor: 'lightgray',
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
