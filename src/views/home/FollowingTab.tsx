import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PostsTab from './PostsTab';
import StoriesTab from './StoriesTab';

const Tab = createMaterialTopTabNavigator();

const FollowingTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{lazy: true, tabBarLabelStyle: {textTransform: 'none'}}}>
      <Tab.Screen
        name={PostsTab.name}
        component={PostsTab}
        options={{tabBarLabel: 'Posts'}}
      />
      <Tab.Screen
        name={StoriesTab.name}
        component={StoriesTab}
        options={{tabBarLabel: 'Stories'}}
      />
    </Tab.Navigator>
  );
};

export default FollowingTab;
