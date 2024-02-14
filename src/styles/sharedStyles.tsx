import {StyleSheet} from 'react-native';

const common = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
  },
  aiCenter: {
    alignItems: 'center',
  },
  acCenter: {
    alignContent: 'center',
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
  rGap5: {
    rowGap: 5,
  },
  rGap15: {
    rowGap: 15,
  },
  cGap3: {
    columnGap: 3,
  },
  cGap5: {
    columnGap: 5,
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
  font20: {
    fontSize: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  white: {
    color: 'white',
  },
  gray: {
    color: 'gray',
  },
  p10: {
    padding: 10,
  },
  p15: {
    padding: 15,
  },
  pb5: {
    paddingBottom: 5,
  },
  pr10: {
    paddingRight: 10,
  },
  mr10: {
    marginRight: 10,
  },
  ml30: {
    marginLeft: 30,
  },
});

export default common;
