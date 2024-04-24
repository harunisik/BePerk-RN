import {NavigationContainer} from '@react-navigation/native';
import {useStore} from '../containers/StoreContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './auth/SignIn';
import BottomTab from './BottomTab';
import PostDove from './doves/PostDove';
import PostDoveScreenOptions from './doves/PostDoveScreenOptions';
import {Fragment} from 'react';
import CreateNewAccount from './profile/settings/CreateNewAccount';
import EditProfile, {
  EditProfileScreenOptions,
} from './profile/settings/EditProfile';
import AddStack from './add/AddStack';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const {store} = useStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!store.authResult ? (
          <Fragment>
            <Stack.Screen name={SignIn.name} component={SignIn} />
            <Stack.Screen
              name={CreateNewAccount.name}
              component={CreateNewAccount}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen name={BottomTab.name} component={BottomTab} />
            <Stack.Screen
              name={PostDove.name}
              component={PostDove}
              options={PostDoveScreenOptions}
            />
            <Stack.Screen
              name={EditProfile.name}
              component={EditProfile}
              options={EditProfileScreenOptions}
            />
            <Stack.Screen
              name={AddStack.name}
              component={AddStack}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
