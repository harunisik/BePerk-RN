import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileStack from '../profile/ProfileStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DovesStack from '../doves/DovesStack';
import {Text, View} from 'react-native';
import {Fragment, useState} from 'react';
import AddModal from '../../components/common/AddModal';
import StoriesStack from '../stories/StoriesStack';
import HomeStack from '../home/HomeStack';

const Placeholder = () => <View />;

const routeIcons = {
  [HomeStack.name]: 'home',
  [StoriesStack.name]: 'account-multiple',
  [Placeholder.name]: 'plus',
  [DovesStack.name]: 'bird',
  [ProfileStack.name]: 'account',
};

const tabBarLabels = {
  [HomeStack.name]: 'Home',
  [StoriesStack.name]: 'Stories',
  [DovesStack.name]: 'Doves',
  [ProfileStack.name]: 'Profile',
};

const screenOptions = ({route}) => ({
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

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Fragment>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name={HomeStack.name} component={HomeStack} />
        <Tab.Screen name={StoriesStack.name} component={StoriesStack} />
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
        <Tab.Screen name={ProfileStack.name} component={ProfileStack} />
      </Tab.Navigator>
      <AddModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </Fragment>
  );
};

export default BottomTab;
