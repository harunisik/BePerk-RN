import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from './Modal';
import View from './View';

const BottomModal = ({visible, onDismiss = undefined, children}) => {
  return (
    <Modal animationType="slide" visible={visible} onDismiss={onDismiss}>
      <View style={styles.modalView}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 'auto',
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

export default BottomModal;
