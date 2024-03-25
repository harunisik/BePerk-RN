import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import StoriesTab from './StoriesTab';
import ExploreTab from './ExploreTab';

const Stories = () => {
  const Tab = createMaterialTopTabNavigator();
  const {flex1} = common;

  return (
    <View style={[flex1]}>
      <Tab.Navigator
        screenOptions={{lazy: true, tabBarLabelStyle: {textTransform: 'none'}}}>
        <Tab.Screen
          name={StoriesTab.name}
          component={StoriesTab}
          options={{tabBarLabel: 'Stories'}}
        />
        <Tab.Screen
          name={ExploreTab.name}
          component={ExploreTab}
          options={{tabBarLabel: 'Explore'}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Stories;
