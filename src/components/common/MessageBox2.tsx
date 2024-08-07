import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import Emoji from './Emoji';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  launchCamera,
  launchImageLibrary,
  launchMediaLibrary,
} from '../../utils/MediaUtil';
import {CameraIcon, PictureIcon, ShareIcon} from './Icons';
import View from './View';
import TextInput from './TextInput';
import {useColors} from '../../hooks/customHooks';

const {row, jcSpaceBetween, p10, aiCenter} = common;

const MessageBox2 = ({onPressSend}) => {
  const [message, setMessage] = useState('');
  const [asset, setAsset] = useState();
  const {theme2} = useColors();
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

  const mediaCallback = data => {
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
  };

  const processPhoto = () =>
    launchImageLibrary(mediaCallback, {mediaType: 'photo'});

  const processCamera = () => launchCamera(mediaCallback, {mediaType: 'photo'});

  useEffect(() => {
    if (asset) {
      handlePress();
    }
  }, [asset]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={tabBarHeight + 10}>
      <View style={[p10, styles.shadowProp, {rowGap: 10}]}>
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
        <View style={[row, jcSpaceBetween, aiCenter, {columnGap: 20}]}>
          <CameraIcon
            onPress={() => launchMediaLibrary(processCamera, 'camera')}
          />
          <TextInput
            placeholder="Message..."
            onChangeText={handleChangeText}
            value={message}
            onSubmitEditing={handlePress}
            style={{flex: 1, borderRadius: 20, paddingHorizontal: 15}}
            theme={theme2}
          />
          {message ? (
            <ShareIcon onPress={handlePress} disabled={!message} />
          ) : (
            <PictureIcon
              onPress={() => launchMediaLibrary(processPhoto, 'image')}
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
  },
});

export default MessageBox2;
