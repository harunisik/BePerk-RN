import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForYouTab from './ForYouTab';
import FeaturedTab from './FeaturedTab';
import FollowingTab from './FollowingTab';

const Home = () => {
  const Tab = createMaterialTopTabNavigator();
  const {flex1} = common;

  return (
    <View style={[flex1]}>
      <Tab.Navigator
        screenOptions={{lazy: true, tabBarLabelStyle: {textTransform: 'none'}}}>
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
    </View>
  );
};

export default Home;
