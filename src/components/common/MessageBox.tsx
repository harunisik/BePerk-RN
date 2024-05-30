import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import common from '../../styles/sharedStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import Emoji from './Emoji';
import AccountCard from './AccountCard';
import View from './View';

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
        style={[styles.shadowProp, {rowGap: 10, padding: 15}]}
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
            style={{
              backgroundColor: 'lightgray',
              borderRadius: 20,
              padding: 10,
              flex: 1,
            }}
            onSubmitEditing={handlePress}
            autoFocus
          />
          <View
            style={{
              backgroundColor: 'lightgray',
              borderRadius: 20,
              padding: 5,
            }}>
            <MaterialCommunityIcons
              name="share"
              size={26}
              color={message ? 'dodgerblue' : 'gray'}
              onPress={handlePress}
              disabled={!message}
            />
          </View>
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
  },
});

export default MessageBox;
