import React from 'react';
import {StyleSheet, Pressable, View, Text} from 'react-native';
import common from '../../styles/sharedStyles';
import Modal from './Modal';

const {bold, font16} = common;

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
            backgroundColor: 'white',
            borderRadius: 20,
            marginHorizontal: 40,
            shadowOpacity: 0.25,
          }}>
          <View style={{alignItems: 'center', padding: 20, rowGap: 5}}>
            <Text style={[bold, font16]}>{header}</Text>
            <Text>{message}</Text>
          </View>
          <View style={{width: '100%'}}>
            <Pressable
              style={{
                paddingVertical: 15,
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: 'gray',
                alignItems: 'center',
              }}
              onPress={onPressOk}>
              <Text style={{color: 'red'}}>{okButtonText}</Text>
            </Pressable>
            <Pressable
              style={{
                paddingVertical: 15,
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: 'gray',
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
