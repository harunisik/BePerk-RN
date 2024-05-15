import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import common from '../../styles/sharedStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import Emoji from './Emoji';

const {row, jcSpaceBetween, p10, aiCenter} = common;

const MessageBox = ({initialText, onClearText, onPress}) => {
  const [message, setMessage] = useState(initialText);
  const [height, setHeight] = useState();

  const handlePress = () => {
    onPress(message);
    setMessage('');
  };

  useEffect(() => {
    setMessage(initialText);
  }, [initialText]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={height}>
      <View
        style={[p10, styles.shadowProp]}
        onLayout={({
          nativeEvent: {
            layout: {height},
          },
        }) => setHeight(height)}>
        <View style={[row, jcSpaceBetween]}>
          {['😌', '🤣', '❤️', '😍', '😱', '✝️', '🙏', '🔥', '😥'].map(
            (item, index) => {
              return <Emoji emoji={item} onPress={setMessage} key={index} />;
            },
          )}
        </View>
        <View style={[row, jcSpaceBetween, aiCenter]}>
          <MaterialIcons name="account-circle" size={26} color="lightgray" />
          <TextInput
            placeholder="Message..."
            onChangeText={text => {
              setMessage(text);
              if (!text) {
                onClearText();
              }
            }}
            value={message}
            style={styles.textInput}
            onSubmitEditing={handlePress}
          />
          <MaterialCommunityIcons
            name="share"
            size={26}
            color={message ? 'dodgerblue' : 'gray'}
            onPress={handlePress}
            disabled={!message}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: 'white',
    // height: 100,
  },
  textInput: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default MessageBox;
