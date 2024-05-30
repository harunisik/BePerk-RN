import {StyleSheet} from 'react-native';
import View from './View';

const ItemSeperator = ({
  lineVisible = false,
  medium = false,
  large = false,
}) => {
  return (
    <View
      style={[
        large
          ? styles.spaceLarge
          : medium
            ? styles.spaceMedium
            : styles.spaceSmall,
      ]}>
      <View style={[...(lineVisible ? [styles.line] : [])]} />
    </View>
  );
};

const styles = StyleSheet.create({
  spaceSmall: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  spaceMedium: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  spaceLarge: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
});

export default ItemSeperator;
