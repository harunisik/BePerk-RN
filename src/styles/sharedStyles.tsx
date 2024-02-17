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
  font16: {
    fontSize: 16,
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
  p5: {
    padding: 5,
  },
  p15: {
    padding: 15,
  },
  pb5: {
    paddingBottom: 5,
  },
  pb10: {
    paddingBottom: 10,
  },
  pt10: {
    paddingTop: 10,
  },
  pl15: {
    paddingLeft: 15,
  },
  pr10: {
    paddingRight: 10,
  },
  pr15: {
    paddingRight: 15,
  },
  mr10: {
    marginRight: 10,
  },
  ml30: {
    marginLeft: 30,
  },
  radius6: {
    borderRadius: 6,
  },
});

export default common;