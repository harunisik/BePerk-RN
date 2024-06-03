import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Modal from './Modal';
import {useColors} from '../../hooks/customHooks';
import View from './View';

const BottomModal = ({visible, onDismiss, children}) => {
  const {theme, backgroundColor} = useColors();
  const _backgroundColor =
    theme === 'dark' ? 'rgb(30, 30, 30)' : backgroundColor;

  return (
    <Modal animationType="slide" visible={visible} onDismiss={onDismiss}>
      <SafeAreaView
        style={[styles.modalView, {backgroundColor: _backgroundColor}]}>
        <View
          style={[
            {
              rowGap: 20,
              paddingTop: 20,
              paddingHorizontal: 40,
              backgroundColor: _backgroundColor,
            },
          ]}>
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
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
