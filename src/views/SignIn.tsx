import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import common from '../styles/sharedStyles';
import {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useQueryClient} from 'react-query';
import {signIn} from '../services/UserService';
import {showMessage} from 'react-native-flash-message';
import {useStore} from '../containers/StoreContainer';
import {AuthActionType} from '../containers/AuthAction';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();
  const {dispatch} = useStore();

  const handleLogin = () => {
    queryClient
      .fetchQuery({
        queryKey: ['signin'],
        queryFn: () => signIn(username, password),
      })
      .then(data => {
        dispatch({type: AuthActionType.SIGN_IN, authResult: data});
      })
      .catch(message => showMessage({message, type: 'danger'}));
  };

  return (
    <View style={common.centered}>
      <Text>Username</Text>
      <TextInput
        placeholder="Tap to enter username"
        onChangeText={setUsername}
        value={username}
        style={common.textInput}
      />
      <Text>Password</Text>
      <TextInput
        placeholder="Tap to enter password"
        onChangeText={setPassword}
        value={password}
        style={common.textInput}
        secureTextEntry
      />
      <TouchableOpacity style={common.button} onPress={handleLogin}>
        <Text>Log In</Text>
      </TouchableOpacity>
      <Text>Or</Text>
      <View style={common.row}>
        <MaterialCommunityIcons name="apple" size={26} />
        <MaterialCommunityIcons name="facebook" size={26} />
        <MaterialCommunityIcons name="twitter" size={26} />
      </View>
      <Text>Do not have account? Registration</Text>
      <Text>Forgot password?</Text>
    </View>
  );
};

export default SignIn;
