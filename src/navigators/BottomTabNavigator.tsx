import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Home from '../views/Home';
import Stories from '../views/Stories';
import Doves from '../views/Doves';
import ProfileNavigator from './ProfileNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyBottomSheet from '../components/MyBottomSheet';

const routeIcons = {
  [Home.name]: 'home',
  [Stories.name]: 'account-multiple',
  [MyBottomSheet.name]: 'plus',
  [Doves.name]: 'bird',
  [ProfileNavigator.name]: 'account',
};

const screenOptions = ({route}) => ({
  headerShown: false,
  tabBarIcon: ({color}) => {
    const iconName = routeIcons[route.name] ?? 'minus';
    return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
  },
});

const BottomTabNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={Home.name} component={Home} />
      <Tab.Screen name={Stories.name} component={Stories} />
      <Tab.Screen
        name={MyBottomSheet.name}
        component={MyBottomSheet}
        options={{tabBarLabel: 'Add'}}
      />
      <Tab.Screen name={Doves.name} component={Doves} />
      <Tab.Screen
        name={ProfileNavigator.name}
        component={ProfileNavigator}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
