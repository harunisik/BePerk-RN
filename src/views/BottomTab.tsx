import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Home from './Home';
import Stories from './Stories';
import Doves from './doves/Doves';
import ProfileStack from './profile/ProfileStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheetModal from '../components/BottomSheetModal';

const routeIcons = {
  [Home.name]: 'home',
  [Stories.name]: 'account-multiple',
  [BottomSheetModal.name]: 'plus',
  [Doves.name]: 'bird',
  [ProfileStack.name]: 'account',
};

const screenOptions = ({route}) => ({
  headerShown: false,
  tabBarIcon: ({color}) => {
    const iconName = routeIcons[route.name] ?? 'minus';
    return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
  },
});

const BottomTab = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={Home.name} component={Home} />
      <Tab.Screen name={Stories.name} component={Stories} />
      <Tab.Screen
        name={BottomSheetModal.name}
        component={BottomSheetModal}
        options={{tabBarLabel: 'Add'}}
      />
      <Tab.Screen name={Doves.name} component={Doves} />
      <Tab.Screen
        name={ProfileStack.name}
        component={ProfileStack}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
