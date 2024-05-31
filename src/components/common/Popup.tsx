import {Pressable} from 'react-native';
import common from '../../styles/sharedStyles';
import Modal from './Modal';
import Text from './Text';
import View from './View';
import HR from './HR';

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
  return (
    <Modal visible={visible} dismissable={false} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}>
        <View
          style={{
            borderRadius: 20,
            marginHorizontal: 40,
            shadowOpacity: 0.25,
          }}>
          <View style={{alignItems: 'center', padding: 20, rowGap: 5}}>
            <Text style={[bold]}>{header}</Text>
            <Text>{message}</Text>
          </View>
          <HR />
          <View style={{width: '100%'}}>
            <Pressable
              style={{
                paddingVertical: 15,
                alignItems: 'center',
              }}
              onPress={onPressOk}>
              <Text style={{color: 'red'}}>{okButtonText}</Text>
            </Pressable>
            <HR />
            <Pressable
              style={{
                paddingVertical: 15,
                alignItems: 'center',
              }}
              onPress={onPressCancel}>
              <Text style={{color: 'dodgerblue'}}>{cancelButtonText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
