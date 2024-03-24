import React, {useEffect, useState} from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  Pressable,
  View,
  GestureResponderEvent,
} from 'react-native';
import common from '../../styles/sharedStyles';

const {flex1} = common;

const Modal = ({visible, onDismiss, children}) => {
  const [modalVisible, setModalVisible] = useState(visible);

  const handlePress = (event: GestureResponderEvent) => {
    if (event.target == event.currentTarget) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      onDismiss={onDismiss}>
      <Pressable style={flex1} onPress={handlePress}>
        <View style={styles.modalView}>{children}</View>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Modal;
