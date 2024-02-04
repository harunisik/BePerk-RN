import {View, Text, StyleSheet} from 'react-native';

const Stories = () => {
  return (
    <View style={styles.container1}>
      <Text>Stories Under construction!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
  },
});

export default Stories;
