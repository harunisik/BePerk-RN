import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import common from '../../styles/sharedStyles';
import {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSignIn} from '../../hooks/userHooks';

const SignIn = () => {
  const [username, setUsername] = useState('harun');
  const [password, setPassword] = useState('123');
  const {flex1, aiCenter, jcCenter, row} = common;

  const handleLogin = useSignIn({username, password});

  handleLogin();

  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>Username</Text>
      <TextInput
        placeholder="Tap to enter username"
        onChangeText={setUsername}
        value={username}
        style={styles.textInput}
        autoFocus
      />
      <Text>Password</Text>
      <TextInput
        placeholder="Tap to enter password"
        onChangeText={setPassword}
        value={password}
        style={styles.textInput}
        secureTextEntry
        onSubmitEditing={handleLogin}
      />
      <TouchableOpacity style={[styles.button, aiCenter]} onPress={handleLogin}>
        <Text>Log In</Text>
      </TouchableOpacity>
      <Text>Or</Text>
      <View style={row}>
        <MaterialCommunityIcons name="apple" size={26} />
        <MaterialCommunityIcons name="facebook" size={26} />
        <MaterialCommunityIcons name="twitter" size={26} />
      </View>
      <Text>Do not have account? Registration</Text>
      <Text>Forgot password?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default SignIn;
