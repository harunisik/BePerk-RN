import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import StoriesTab from './StoriesTab';
import ExploreTab from './ExploreTab';

const Tab = createMaterialTopTabNavigator();

const Stories = () => {
  return (
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
  );
};

export default Stories;
