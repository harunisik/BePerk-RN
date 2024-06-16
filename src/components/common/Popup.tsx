import {Pressable} from 'react-native';
import common from '../../styles/sharedStyles';
import Modal from './Modal';
import Text from './Text';
import View from './View';
import HR from './HR';
import {colors, useColors} from '../../hooks/customHooks';

const {bold} = common;

const Popup = ({
  visible,
  header,
  message,
  onPressOk,
  onPressCancel,
  okButtonText = 'Ok',
  cancelButtonText = 'Cancel',
}) => {
  const {theme, backgroundColor} = useColors();

  return (
    <Modal visible={visible} dismissable={false} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}>
        <View
          style={{
            borderRadius: 20,
            marginHorizontal: 40,
            shadowOpacity: 0.25,
            backgroundColor:
              theme === 'dark' ? 'rgb(40, 40, 40)' : backgroundColor,
          }}>
          <View
            style={{alignItems: 'center', padding: 20, rowGap: 5}}
            disableTheme>
            <Text style={[bold]} size={17}>
              {header}
            </Text>
            <Text>{message}</Text>
          </View>
          <HR color="gray" />
          <View style={{width: '100%'}} disableTheme>
            <Pressable
              style={{
                paddingVertical: 15,
                alignItems: 'center',
              }}
              onPress={onPressOk}>
              <Text color={colors.blue} size={17}>
                {okButtonText}
              </Text>
            </Pressable>
            <HR color="gray" />
            <Pressable
              style={{
                paddingVertical: 15,
                alignItems: 'center',
              }}
              onPress={onPressCancel}>
              <Text color="red" size={17}>
                {cancelButtonText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
