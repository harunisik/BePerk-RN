import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import common from '../../styles/sharedStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateNewAccount from './CreateNewAccount';
import {useSignIn} from '../../hooks/userHooks';
import ForgotPassword from './ForgotPassword';
import Text from '../../components/common/Text';

const {row, flex1, aiCenter, rGap30, white} = common;

const Signin = () => {
  const [username, setUsername] = useState('harun-local');
  const [password, setPassword] = useState('123');

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
            <Image
              style={{width: 80, height: 80}}
              source={require('../../assets/beperk_logo.png')}
            />
            <Text>{process.env.API_URL}</Text>
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
            style={[styles.line]}
          />
        </View>
        <View style={{width: '75%'}}>
          <Text>Password</Text>
          <TextInput
            placeholder="Tap to enter password"
            onChangeText={setPassword}
            value={password}
            style={[styles.line]}
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
            style={{color: 'dodgerblue', textDecorationLine: 'underline'}}
            onPress={() => navigation.navigate(CreateNewAccount.name)}>
            Registration
          </Text>
        </Text>
        <Text
          style={{color: 'dodgerblue', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate(ForgotPassword.name)}>
          Forgot password?
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
});

export default Signin;
