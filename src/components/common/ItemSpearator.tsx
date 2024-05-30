import {StyleSheet} from 'react-native';
import View from './View';
import HR from './HR';

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
      {lineVisible && <HR />}
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
});

export default ItemSeperator;
