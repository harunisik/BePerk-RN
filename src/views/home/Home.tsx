import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForYouTab from './ForYouTab';
import FeaturedTab from './FeaturedTab';
import FollowingTab from './FollowingTab';
import {View} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarIndicatorStyle: {display: 'none'},
        tabBarLabelStyle: {
          textTransform: 'none',
          color: 'white',
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          alignSelf: 'center',
          width: '70%',
          // top: 50,
        },
        tabBarItemStyle: {
          width: 'auto',
          paddingHorizontal: 10,
          paddingVertical: 0,
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 18,
          minHeight: 30,
        },
      }}>
      <Tab.Screen
        name={ForYouTab.name}
        component={ForYouTab}
        options={{tabBarLabel: 'For You'}}
      />
      <Tab.Screen
        name={FeaturedTab.name}
        component={FeaturedTab}
        options={{tabBarLabel: 'Featured'}}
      />
      <Tab.Screen
        name={FollowingTab.name}
        component={FollowingTab}
        options={{tabBarLabel: 'Following'}}
      />
    </Tab.Navigator>
  );
};

export default Home;
