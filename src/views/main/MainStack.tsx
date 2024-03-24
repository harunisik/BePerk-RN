import {NavigationContainer} from '@react-navigation/native';
import {useStore} from '../../containers/StoreContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../auth/SignIn';
import BottomTab from './BottomTab';
import Add from '../home/Add';
import PostDove from '../doves/PostDove';
import PostDoveScreenOptions from '../doves/PostDoveScreenOptions';
import {Fragment} from 'react';

const MainStack = () => {
  const Stack = createNativeStackNavigator();

  const {store} = useStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!store.authResult ? (
          <Stack.Screen name={SignIn.name} component={SignIn} />
        ) : (
          <Fragment>
            <Stack.Screen name={BottomTab.name} component={BottomTab} />
            <Stack.Screen
              name={Add.name}
              component={Add}
              options={{
                presentation: 'transparentModal',
              }}
            />
            <Stack.Screen
              name={PostDove.name}
              component={PostDove}
              options={PostDoveScreenOptions}
            />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
