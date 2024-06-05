import {SafeAreaView, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import common from '../../styles/sharedStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateNewAccount from './CreateNewAccount';
import {useSignIn} from '../../hooks/queryClientHooks';
import ForgotPassword from './ForgotPassword';
import Text from '../../components/common/Text';
import HR from '../../components/common/HR';
import TextInput from '../../components/common/TextInput';
import View from '../../components/common/View';
import {useColors} from '../../hooks/customHooks';
import Button from '../../components/common/buttons/Button';

const {row, gray, flex1, aiCenter, rGap30} = common;

const Signin = () => {
  const [username, setUsername] = useState('harun-local');
  const [password, setPassword] = useState('123');

  const {backgroundColor} = useColors();

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
      <LinearGradient
        colors={['#0AAEEF', backgroundColor]}
        style={{height: '30%'}}>
        <SafeAreaView>
          <View style={[aiCenter, {paddingTop: 40}]} disableTheme>
            <Image
              style={{width: 80, height: 80}}
              source={require('../../assets/beperk_logo.png')}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={[flex1, aiCenter, rGap30]}>
        <View style={{width: '75%', rowGap: 10}}>
          <Text style={gray}>Username</Text>
          <TextInput
            placeholder="Tap to enter username"
            onChangeText={setUsername}
            value={username}
          />
          <HR />
        </View>
        <View style={{width: '75%', rowGap: 10}}>
          <Text style={gray}>Password</Text>
          <TextInput
            placeholder="Tap to enter password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <HR />
        </View>
        <Button
          title="Log In"
          onPress={handlePressLogin}
          style={{
            paddingHorizontal: 70,
            paddingVertical: 12,
            borderColor: 'white',
            borderWidth: StyleSheet.hairlineWidth,
          }}
          labelStyle={{fontSize: 20, fontWeight: '500'}}
        />
        <Text>Or</Text>
        <View style={row}>
          <MaterialCommunityIcons name="apple" size={50} color="#0AAEEF" />
          <MaterialCommunityIcons name="facebook" size={50} color="#0AAEEF" />
          <MaterialCommunityIcons name="twitter" size={50} color="#0AAEEF" />
        </View>
        <Text>
          Do not have account?{' '}
          <Text
            style={{color: '#0AAEEF', textDecorationLine: 'underline'}}
            onPress={() => navigation.navigate(CreateNewAccount.name)}>
            Registration
          </Text>
        </Text>
        <Text
          style={{color: '#0AAEEF', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate(ForgotPassword.name)}>
          Forgot password?
        </Text>
      </View>
    </>
  );
};

export default Signin;
