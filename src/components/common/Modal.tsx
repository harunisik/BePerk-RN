import {useEffect, useState} from 'react';
import {Modal as RNModal, Pressable, GestureResponderEvent} from 'react-native';
import common from '../../styles/sharedStyles';

const {flex1} = common;

const Modal = ({
  visible,
  onDismiss,
  children,
  dismissable = true,
  animationType = 'slide',
}) => {
  const [modalVisible, setModalVisible] = useState(visible);

  const handlePress = (event: GestureResponderEvent) => {
    if (dismissable && event.target == event.currentTarget) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <RNModal
      animationType={animationType}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      onDismiss={onDismiss}>
      <Pressable style={flex1} onPress={handlePress}>
        {children}
      </Pressable>
    </RNModal>
  );
};

export default Modal;
