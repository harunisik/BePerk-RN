import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForYouTab from './ForYouTab';
import FeaturedTab from './FeaturedTab';
import FollowingTab from './FollowingTab';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarLabelStyle: {textTransform: 'none', color: 'red'},
        tabBarStyle: {
          // backgroundColor: 'transparent',
          // position: 'absolute',
          // width: '100%',
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
