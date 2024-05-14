import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import common from '../../styles/sharedStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import Emoji from './Emoji';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const {row, jcSpaceBetween, p10, aiCenter} = common;

const MessageBox2 = ({onPressSend}) => {
  const [message, setMessage] = useState('');
  const tabBarHeight = useBottomTabBarHeight();

  const handlePress = () => {
    onPressSend(message);
    setMessage('');
  };

  const handleChangeText = (text: string) => {
    setMessage(text);
    if (!text) {
      // onClearText();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={tabBarHeight}>
      <View style={[p10, styles.shadowProp]}>
        <View style={[row, jcSpaceBetween]}>
          {['😌', '🤣', '❤️', '😍', '😱', '✝️', '🙏', '🔥', '😥'].map(
            (item, index) => {
              return <Emoji emoji={item} onPress={setMessage} key={index} />;
            },
          )}
        </View>
        <View style={[row, jcSpaceBetween, aiCenter]}>
          <AntDesign name="camera" size={26} color="dodgerblue" />
          <TextInput
            placeholder="Message..."
            onChangeText={handleChangeText}
            value={message}
            style={styles.textInput}
            onSubmitEditing={handlePress}
          />
          {message ? (
            <MaterialCommunityIcons
              name="share"
              size={26}
              color={message ? 'dodgerblue' : 'gray'}
              onPress={handlePress}
              disabled={!message}
            />
          ) : (
            <AntDesign name="picture" size={26} color="dodgerblue" />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: 'white',
  },
  textInput: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default MessageBox2;
