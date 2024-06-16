import {StyleSheet} from 'react-native';
import View from './View';
import HR from './HR';

interface ItemSeperatorProps {
  lineVisible?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const ItemSeperator = ({
  lineVisible = false,
  size = 'small',
}: ItemSeperatorProps) => {
  return (
    <View
      style={[
        size === 'large'
          ? styles.spaceLarge
          : size === 'medium'
            ? styles.spaceMedium
            : styles.spaceSmall,
      ]}>
      {lineVisible && <HR />}
    </View>
  );
};

const styles = StyleSheet.create({
  spaceSmall: {
    paddingVertical: 5,
  },
  spaceMedium: {
    paddingVertical: 10,
  },
  spaceLarge: {
    paddingVertical: 15,
  },
});

export default ItemSeperator;
