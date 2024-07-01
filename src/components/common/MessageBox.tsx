import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import Emoji from './Emoji';
import AccountCard from './AccountCard';
import View from './View';
import {ShareIcon} from './Icons';
import TextInput from './TextInput';
import {useColors} from '../../hooks/customHooks';

const {row, jcSpaceBetween, aiCenter} = common;

const MessageBox = ({initialText, onClearText, onPress}) => {
  const [message, setMessage] = useState(initialText);
  const {theme2} = useColors();

  const handlePress = () => {
    onPress(message);
    setMessage('');
    Keyboard.dismiss();
  };

  useEffect(() => {
    setMessage(initialText);
  }, [initialText]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={115}>
      <View
        style={[
          styles.shadowProp,
          {rowGap: 10, paddingHorizontal: 15, paddingTop: 5},
        ]}>
        <View style={[row, jcSpaceBetween]}>
          {['😌', '🤣', '❤️', '😍', '😱', '✝️', '🙏', '🔥', '😥'].map(
            (item, index) => {
              return (
                <Emoji
                  emoji={item}
                  onPress={setMessage}
                  key={index}
                  size={22}
                />
              );
            },
          )}
        </View>
        <View style={[row, jcSpaceBetween, aiCenter, {columnGap: 10}]}>
          <AccountCard isAuthUser={true} displayUsername={false} size={25} />
          <TextInput
            placeholder="Message..."
            onChangeText={text => {
              setMessage(text);
              if (!text) {
                onClearText();
              }
            }}
            value={message}
            onSubmitEditing={handlePress}
            style={{
              flex: 1,
              borderRadius: 20,
              paddingHorizontal: 15,
            }}
            theme={theme2}
          />
          <View
            style={{
              backgroundColor: 'lightgray',
              borderRadius: 20,
              padding: 5,
            }}>
            <ShareIcon onPress={handlePress} disabled={!message} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'gray',
    // shadowColor: '#171717',
    // shadowOffset: {width: 0, height: -3},
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
  },
});

export default MessageBox;
