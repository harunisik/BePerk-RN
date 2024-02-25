import {StyleSheet, View} from 'react-native';

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
        ...(lineVisible ? [styles.line] : []),
      ]}
    />
  );
};

const styles = StyleSheet.create({
  spaceSmall: {
    marginBottom: 5,
    marginTop: 5,
  },
  spaceMedium: {
    marginBottom: 10,
    marginTop: 10,
  },
  spaceLarge: {
    marginBottom: 15,
    marginTop: 15,
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
});

export default ItemSeperator;
