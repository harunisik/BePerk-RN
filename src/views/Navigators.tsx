import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import Home from './Home';
import Stories from './Stories';
import Doves from './Doves';
import Profile from './Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyBottomSheet from '../components/MyBottomSheet';
import {useStore} from '../containers/StoreContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './SignIn';

const routeIcons = {
  Home: 'home',
  Stories: 'account-multiple',
  Add: 'plus',
  Doves: 'bird',
  Profile: 'account',
};

const screenOptions = ({route}) => ({
  headerShown: false,
  tabBarIcon: ({color}) => {
    const iconName = routeIcons[route.name] ?? 'minus';
    return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
  },
});

const BottomTabGroup = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Stories" component={Stories} />
      <Tab.Screen name="Add" component={MyBottomSheet} />
      <Tab.Screen name="Doves" component={Doves} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const NavigationLayout = () => {
  const Stack = createNativeStackNavigator();

  const {store} = useStore();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {store.token ? (
            <Stack.Screen name="Signin" component={SignIn} />
          ) : (
            <Stack.Screen name="BottomTabGroup" component={BottomTabGroup} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default NavigationLayout;
