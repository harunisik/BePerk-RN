import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import Emoji from './Emoji';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {launchMediaLibrary} from '../../utils/MediaUtil';
import {PERMISSIONS} from 'react-native-permissions';
// import View from './View';
import {CameraIcon, PictureIcon, ShareIcon} from './Icons';
import {View} from 'react-native';

const {row, jcSpaceBetween, p10, aiCenter} = common;

const MessageBox2 = ({onPressSend}) => {
  const [message, setMessage] = useState('');
  const [asset, setAsset] = useState();

  const tabBarHeight = useBottomTabBarHeight();

  const handlePress = () => {
    onPressSend(message, asset);
    setMessage('');
    setAsset(undefined);
  };

  const handleChangeText = (text: string) => {
    setMessage(text);
    if (!text) {
      // onClearText();
    }
  };

  const handlePressMediaButton = permission => {
    launchMediaLibrary(
      permission,
      data => {
        if (data.assets?.length && data.assets.length > 0) {
          setAsset(
            data.assets.map(({type, ...rest}) => {
              return {
                ...rest,
                type,
                mediaType: type.startsWith('image') ? 'photo' : 'video',
              };
            }),
          );
        }
      },
      {mediaType: 'photo'},
    );
  };

  useEffect(() => {
    if (asset) {
      handlePress();
    }
  }, [asset]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={tabBarHeight}>
      <View style={[p10, styles.shadowProp, {rowGap: 10}]}>
        <View style={[row, jcSpaceBetween]}>
          {['😌', '🤣', '❤️', '😍', '😱', '✝️', '🙏', '🔥', '😥'].map(
            (item, index) => {
              return <Emoji emoji={item} onPress={setMessage} key={index} />;
            },
          )}
        </View>
        <View style={[row, jcSpaceBetween, aiCenter, {columnGap: 20}]}>
          <CameraIcon
            onPress={() => handlePressMediaButton(PERMISSIONS.IOS.CAMERA)}
          />
          <TextInput
            placeholder="Message..."
            onChangeText={handleChangeText}
            value={message}
            style={{
              backgroundColor: 'lightgray',
              borderRadius: 20,
              padding: 10,
              flex: 1,
            }}
            onSubmitEditing={handlePress}
          />
          {message ? (
            <ShareIcon onPress={handlePress} disabled={!message} />
          ) : (
            <PictureIcon
              onPress={() =>
                handlePressMediaButton(PERMISSIONS.IOS.PHOTO_LIBRARY)
              }
            />
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
    backgroundColor: 'rgb(40, 40, 40)',
  },
});

export default MessageBox2;
