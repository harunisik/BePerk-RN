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
import {colors, useColors} from '../hooks/customHooks';
import {StyleSheet} from 'react-native';

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
  const {theme} = useColors();
  // const routeName = getFocusedRouteNameFromRoute(route);

  return {
    lazy: true,
    headerShown: false,
    tabBarIcon: ({color}) => {
      const iconName = routeIcons[route.name] ?? 'minus';

      return (
        <View
          disableTheme
          style={{
            alignItems: 'center',
          }}>
          {route.name === AddStack.name ? (
            <View
              style={{
                backgroundColor: colors.blue,
                borderRadius: 20,
                padding: 3,
              }}>
              <MaterialCommunityIcons name={iconName} size={26} color="white" />
            </View>
          ) : (
            <MaterialCommunityIcons name={iconName} size={26} color={color} />
          )}
          {route.name !== AddStack.name && (
            <Text color={color} size={15}>
              {tabBarLabels[route.name]}
            </Text>
          )}
        </View>
      );
    },
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor:
        theme === 'dark' ? 'rgb(15, 15, 15)' : 'rgb(245, 245, 245)',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: 'rgb(100, 100, 100)',
      paddingTop: 5,
      // ...(![Home.name, FeaturedItemDetails.name, MessageDetails.name].includes(
      //   routeName,
      // )
      //   ? {position: 'absolute', opacity: 0.85}
      //   : {}),
      //   display:
      //     getFocusedRouteNameFromRoute(route) === StoryView.name ? 'none' : 'flex',
      // https://stackoverflow.com/questions/51352081/react-navigation-how-to-hide-tabbar-from-inside-stack-navigation
    },
    tabBarActiveTintColor: colors.blue,
    ...(theme !== 'dark' && {tabBarInactiveTintColor: 'gray'}),
  };
};

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    store: {
      userInfo: {userId, username},
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
          initialParams={{userId, username, headerBackVisible: false}}
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
