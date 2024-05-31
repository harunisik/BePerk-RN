import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import HomeStack from './home/HomeStack';
import FeaturedStack from './featured/FeaturedStack';
import DovesStack from './doves/DovesStack';
import ProfileStack from './profile/ProfileStack';
import {useStore} from '../containers/StoreContainer';
import AddModal from './add/AddModal';
import AddStack from './add/AddStack';
import Text from '../components/common/Text';
import View from '../components/common/View';
import {useColors} from '../hooks/customHooks';

const routeIcons = {
  [HomeStack.name]: 'home',
  [FeaturedStack.name]: 'star',
  [AddStack.name]: 'plus',
  [DovesStack.name]: 'bird',
  [ProfileStack.name]: 'account',
};

const tabBarLabels = {
  [HomeStack.name]: 'Home',
  [FeaturedStack.name]: 'Featured',
  [AddStack.name]: '',
  [DovesStack.name]: 'Doves',
  [ProfileStack.name]: 'Profile',
};

const BottomTabScreenOptions = ({route}) => {
  const {backgroundColor} = useColors();

  return {
    lazy: true,
    headerShown: false,
    tabBarIcon: ({color}) => {
      const iconName = routeIcons[route.name] ?? 'minus';

      return (
        <View style={{alignItems: 'center'}}>
          <MaterialCommunityIcons name={iconName} size={26} color={color} />
          {route.name !== AddStack.name && (
            <Text style={{color}}>{tabBarLabels[route.name]}</Text>
          )}
        </View>
      );
    },
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor,
      //   display:
      //     getFocusedRouteNameFromRoute(route) === StoryView.name ? 'none' : 'flex',
    },
    // https://stackoverflow.com/questions/51352081/react-navigation-how-to-hide-tabbar-from-inside-stack-navigation
  };
};

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
      <Tab.Navigator screenOptions={BottomTabScreenOptions}>
        <Tab.Screen name={HomeStack.name} component={HomeStack} />
        <Tab.Screen name={FeaturedStack.name} component={FeaturedStack} />
        <Tab.Screen
          name={AddStack.name}
          component={AddStack}
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
