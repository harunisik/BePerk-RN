import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import {useMutation} from '../../../hooks/customHooks';
import {createUser as userCreateUser} from '../../../services/AuthService';
import {showMessage} from 'react-native-flash-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useStore} from '../../../containers/StoreContainer';
import {AuthActionType} from '../../../containers/AuthAction';
import Signin from '../../auth/SignIn';
import EditProfile from './EditProfile';

const {row, flex1, aiCenter, rGap30, jcSpaceBetween, white, font11, bold} =
  common;

const pageTitle = 'Create a new account';

export const CreateNewAccountScreenOptions = ({navigation}) => {
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

export const CreateNewAccountListItem = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(CreateNewAccount.name)}
      style={[row, jcSpaceBetween, aiCenter]}>
      <Text>{pageTitle}</Text>
      <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
    </Pressable>
  );
};

const CreateNewAccount = () => {
  const [username, setUsername] = useState('harun1');
  const [email, setEmail] = useState('harun1712@gmail.com');
  const [password, setPassword] = useState('123');
  const [confirmPassword, setConfirmPassword] = useState('123');
  const navigation = useNavigation();
  const {
    dispatch,
    store: {authResult},
  } = useStore();
  const createUser = useMutation(userCreateUser);

  const handlePressRegister = () => {
    if (!username) {
      showMessage({
        message: 'Username is empty',
        type: 'warning',
      });
      return;
    }

    if (!email) {
      showMessage({
        message: 'Email is empty',
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

    if (password !== confirmPassword) {
      showMessage({
        message: 'Password is not the same as confirm password',
        type: 'danger',
      });
      return;
    }

    createUser.mutate(
      {
        username,
        email,
        password,
      },
      {
        onSuccess: ({user_id, token}) => {
          showMessage({message: 'Account created'});
          if (authResult) {
            dispatch({
              type: AuthActionType.SIGN_OUT,
            });
          } else {
            dispatch({
              type: AuthActionType.SIGN_IN,
              authResult: {id: user_id, token, username},
            });
            // if (navigation.canGoBack()) {
            //   navigation.goBack();
            // }
            navigation.navigate(EditProfile.name);
          }

          // navigation.navigate(MainStack.name, {
          //   screen: EditProfile.name,
          // });

          // navigation.navigate(BottomTab.name, {
          //   screen: ProfileStack.name,
          //   params: {
          //     screen: EditProfile.name,
          //   },
          // });
        },
      },
    );
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
          <Text>E-mail</Text>
          <TextInput
            placeholder="Tap to enter e-mail"
            onChangeText={setEmail}
            value={email}
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
        <View style={{width: '75%'}}>
          <Text>Confirm new password</Text>
          <TextInput
            placeholder="Tap to confirm password"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
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
          onPress={handlePressRegister}>
          <Text style={white}>Register</Text>
        </TouchableOpacity>
        <View
          style={[
            styles.line,
            {
              width: '55%',
              paddingBottom: 10,
              alignItems: 'center',
            },
          ]}>
          <Text style={[font11, {width: '85%'}]}>
            By clicking Register, you agree to our{' '}
            <Text style={bold}>Terms</Text> and{' '}
            <Text style={bold}>Privacy Policy</Text>
          </Text>
        </View>
        <Text>
          Go to{' '}
          <Text
            style={{color: 'dodgerblue', textDecorationLine: 'underline'}}
            onPress={() => {
              if (authResult) {
                dispatch({type: AuthActionType.SIGN_OUT});
              } else {
                navigation.navigate(Signin.name);
              }
            }}>
            login
          </Text>
        </Text>
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

export default CreateNewAccount;
