import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Pressable, View} from 'react-native';
import Text from './Text';

const ModalDemo = ({visible}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const navigation = useNavigation();

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
      onDismiss={() => {
        // navigation.goBack()
      }}>
      <Pressable
        style={styles.centeredView}
        onPress={event => {
          if (event.target == event.currentTarget) {
            setModalVisible(false);
          }
        }}>
        {/* <View style={styles.centeredView}> */}
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
        {/* </View> */}
      </Pressable>
    </Modal>
    // <Pressable
    //   style={[styles.button, styles.buttonOpen]}
    //   onPress={() => setModalVisible(true)}>
    //   <Text style={styles.textStyle}>Show Modal</Text>
    // </Pressable>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 'auto',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalDemo;
