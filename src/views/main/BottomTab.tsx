import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Home from '../home/Home';
import Stories from '../stories/Stories';
import ProfileStack from '../profile/ProfileStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DovesStack from '../doves/DovesStack';
import Add from '../home/Add';

const routeIcons = {
  [Home.name]: 'home',
  [Stories.name]: 'account-multiple',
  [Add.name]: 'plus',
  [DovesStack.name]: 'bird',
  [ProfileStack.name]: 'account',
};

const screenOptions = ({route}) => ({
  headerShown: false,
  tabBarIcon: ({color}) => {
    const iconName = routeIcons[route.name] ?? 'minus';
    return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
  },
  // tabBarStyle: {
  //   display:
  //     getFocusedRouteNameFromRoute(route) === StoryView.name ? 'none' : 'flex',
  // },
  // https://stackoverflow.com/questions/51352081/react-navigation-how-to-hide-tabbar-from-inside-stack-navigation
});

const BottomTab = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={Home.name} component={Home} />
      <Tab.Screen name={Stories.name} component={Stories} />
      <Tab.Screen
        name={Add.name}
        component={Add}
        options={{tabBarLabel: 'Add'}}
      />
      <Tab.Screen
        name={DovesStack.name}
        component={DovesStack}
        options={{tabBarLabel: 'Doves'}}
      />
      <Tab.Screen
        name={ProfileStack.name}
        component={ProfileStack}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
