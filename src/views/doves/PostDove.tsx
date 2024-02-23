import {StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';

const PostDove = ({navigation, route}) => {
  const [caption, setCaption] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const toggleSwitch = () => setIsAnonymous(previousState => !previousState);
  const {p15, row, rGap15, jcSpaceBetween, aiCenter} = common;
  const {
    params: {inputTextPlaceHolder},
  } = route;

  useEffect(() => {
    navigation.setParams({
      caption,
      isAnonymous,
    });
  }, [caption, isAnonymous]);

  return (
    <View style={[p15, rGap15]}>
      <TextInput
        placeholder={inputTextPlaceHolder}
        onChangeText={setCaption}
        value={caption}
        style={[styles.textInput, styles.shadowProp]}
        multiline
        numberOfLines={20}
      />
      <View style={[row, jcSpaceBetween, aiCenter]}>
        <Text>Anonymous</Text>
        <Switch onValueChange={toggleSwitch} value={isAnonymous} />
      </View>
      <Text>400</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 200,
    padding: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: 'white',
  },
});

export default PostDove;
