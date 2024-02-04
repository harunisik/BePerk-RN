import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useStore} from '../../../containers/StoreContainer';
import {AuthActionType} from '../../../containers/AuthAction';

const LogOut = () => {
  const {dispatch} = useStore();

  return (
    <TouchableOpacity onPress={() => dispatch({type: AuthActionType.SIGN_OUT})}>
      <Text>Log out</Text>
    </TouchableOpacity>
  );
};

export default LogOut;
