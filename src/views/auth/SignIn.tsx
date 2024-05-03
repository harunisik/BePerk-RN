import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import common from '../../styles/sharedStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateNewAccount from '../profile/settings/CreateNewAccount';
import {useSignIn} from '../../hooks/userHooks';

const {row, flex1, aiCenter, rGap30, white} = common;

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const signIn = useSignIn({username, password});

  const handlePressLogin = () => {
    if (!username) {
      showMessage({
        message: 'Username is empty',
        type: 'warning',
      });
      return;
    }

    if (!password) {
      showMessage({
        message: 'Password is empty',
        type: 'warning',
      });
      return;
    }

    signIn();
  };

  return (
    <>
      <LinearGradient colors={['dodgerblue', 'white']} style={{height: '30%'}}>
        <SafeAreaView>
          <View style={[aiCenter, {paddingTop: 40}]}>
            <MaterialIcons name="account-circle" size={80} color="dodgerblue" />
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={[flex1, aiCenter, rGap30, {backgroundColor: 'white'}]}>
        <View style={{width: '75%'}}>
          <Text>Username</Text>
          <TextInput
            placeholder="Tap to enter username"
            onChangeText={setUsername}
            value={username}
            style={[styles.textInput, styles.line]}
          />
        </View>
        <View style={{width: '75%'}}>
          <Text>Password</Text>
          <TextInput
            placeholder="Tap to enter password"
            onChangeText={setPassword}
            value={password}
            style={[styles.textInput, styles.line]}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={[
            {
              backgroundColor: 'dodgerblue',
              padding: 15,
              width: '55%',
              borderRadius: 20,
            },
            aiCenter,
          ]}
          onPress={handlePressLogin}>
          <Text style={white}>Log In</Text>
        </TouchableOpacity>
        <Text>Or</Text>
        <View style={row}>
          <MaterialCommunityIcons name="apple" size={50} />
          <MaterialCommunityIcons name="facebook" size={50} />
          <MaterialCommunityIcons name="twitter" size={50} />
        </View>
        <Text>
          Do not have account?{' '}
          <Text
            style={{color: 'dodgerblue'}}
            onPress={() => navigation.navigate(CreateNewAccount.name)}>
            Registration
          </Text>
        </Text>
        <Text style={{color: 'dodgerblue'}}>Forgot password?</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 30,
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
});

export default Signin;
