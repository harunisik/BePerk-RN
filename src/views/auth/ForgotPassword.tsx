import {SafeAreaView, Image, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useMutation} from '../../hooks/reactQueryHooks';
import {recoverUser} from '../../services/AuthService';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import Signin from './SignIn';
import CreateNewAccount from './CreateNewAccount';
import Text from '../../components/common/Text';
import View from '../../components/common/View';
import HR from '../../components/common/HR';
import {CloseIcon} from '../../components/common/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInput from '../../components/common/TextInput';
import {useColors} from '../../hooks/customHooks';
import Button from '../../components/common/buttons/Button';

const {row, flex1, aiCenter, rGap30} = common;

export const ForgotPasswordScreenOptions = ({navigation}) => {
  return {
    title: '',
    headerTransparent: true,
    animation: 'slide_from_bottom',
    presentation: 'fullScreenModal',
    headerLeft: () => <CloseIcon onPress={() => navigation.goBack()} />,
  };
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const {backgroundColor} = useColors();
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
          <Text>E-mail</Text>
          <TextInput
            placeholder="Tap to enter e-mail"
            onChangeText={setEmail}
            value={email}
          />
          <HR />
        </View>
        <Button
          title="Reset Password"
          onPress={handlePressResetPassword}
          style={{
            paddingHorizontal: 50,
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
      </View>
    </>
  );
};

export default ForgotPassword;
