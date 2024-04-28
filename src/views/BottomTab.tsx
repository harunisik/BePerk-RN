import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'react-native';
import {useState} from 'react';
import HomeStack from './home/HomeStack';
import FeaturedStack from './featured/FeaturedStack';
import DovesStack from './doves/DovesStack';
import ProfileStack from './profile/ProfileStack';
import {useStore} from '../containers/StoreContainer';
import AddModal from './add/AddModal';

const Placeholder = () => <View />;

const routeIcons = {
  [HomeStack.name]: 'home',
  [FeaturedStack.name]: 'star',
  [Placeholder.name]: 'plus',
  [DovesStack.name]: 'bird',
  [ProfileStack.name]: 'account',
};

const tabBarLabels = {
  [HomeStack.name]: 'Home',
  [FeaturedStack.name]: 'Featured',
  [DovesStack.name]: 'Doves',
  [ProfileStack.name]: 'Profile',
};

const screenOptions = ({route}) => ({
  lazy: true,
  headerShown: false,
  tabBarIcon: ({color}) => {
    const iconName = routeIcons[route.name] ?? 'minus';

    return (
      <View style={{alignItems: 'center'}}>
        <MaterialCommunityIcons name={iconName} size={26} color={color} />
        {route.name !== Placeholder.name && (
          <Text style={{fontSize: 11, color}}>{tabBarLabels[route.name]}</Text>
        )}
      </View>
    );
  },
  tabBarShowLabel: false,
  // tabBarStyle: {
  //   display:
  //     getFocusedRouteNameFromRoute(route) === StoryView.name ? 'none' : 'flex',
  // },
  // https://stackoverflow.com/questions/51352081/react-navigation-how-to-hide-tabbar-from-inside-stack-navigation
});

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    store: {
      authResult: {id, username},
    },
  } = useStore();

  return (
    <>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name={HomeStack.name} component={HomeStack} />
        <Tab.Screen name={FeaturedStack.name} component={FeaturedStack} />
        <Tab.Screen
          name={Placeholder.name}
          component={Placeholder}
          listeners={() => ({
            tabPress: e => {
              e.preventDefault();
              setModalVisible(true);
            },
          })}
        />
        <Tab.Screen name={DovesStack.name} component={DovesStack} />
        <Tab.Screen
          name={ProfileStack.name}
          component={ProfileStack}
          initialParams={{userId: id, username, headerBackVisible: false}}
        />
      </Tab.Navigator>
      <AddModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </>
  );
};

export default BottomTab;
