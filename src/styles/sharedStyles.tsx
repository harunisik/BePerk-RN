import {StyleSheet} from 'react-native';

const common = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  aiCenter: {
    alignItems: 'center',
  },
  jcCenter: {
    justifyContent: 'center',
  },
  jcSpaceBetween: {
    justifyContent: 'space-between',
  },
  jcSpaceAround: {
    justifyContent: 'space-around',
  },
  dashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  rGap15: {
    rowGap: 15,
  },
  cGap3: {
    columnGap: 3,
  },
  cGap10: {
    columnGap: 10,
  },
  font11: {
    fontSize: 11,
  },
  font12: {
    fontSize: 12,
  },
  white: {
    color: 'white',
  },
});

export default common;
