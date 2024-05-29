import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import common from '../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useMutation} from '../../hooks/customHooks';
import {recoverUser} from '../../services/AuthService';
import {showMessage} from 'react-native-flash-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Signin from './SignIn';
import CreateNewAccount from './CreateNewAccount';
import Text from '../../components/common/Text';

const {row, flex1, aiCenter, rGap30, white} = common;

export const ForgotPasswordScreenOptions = ({navigation}) => {
  return {
    title: '',
    headerTransparent: true,
    animation: 'slide_from_bottom',
    presentation: 'fullScreenModal',
    headerLeft: () => (
      <MaterialCommunityIcons
        name="close"
        onPress={() => navigation.goBack()}
        size={26}
        color="white"
      />
    ),
  };
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const recoverUserApi = useMutation(recoverUser);

  const handlePressResetPassword = () => {
    if (!email) {
      showMessage({
        message: 'Email is empty',
        type: 'warning',
      });
      return;
    }

    recoverUserApi.mutate(
      {email},
      {
        onSuccess: () => {
          showMessage({message: 'We sent you an email to reset your password'});
          navigation.navigate(Signin.name);
        },
        onError: error => {
          showMessage({message: error.message, type: 'warning'});
        },
      },
    );
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
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={[flex1, aiCenter, rGap30, {backgroundColor: 'white'}]}>
        <View style={{width: '75%'}}>
          <Text>E-mail</Text>
          <TextInput
            placeholder="Tap to enter e-mail"
            onChangeText={setEmail}
            value={email}
            style={[styles.line]}
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
          onPress={handlePressResetPassword}>
          <Text style={white}>Reset Password</Text>
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

export default ForgotPassword;
