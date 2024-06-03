import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PostsTab from './PostsTab';
import StoriesTab from './StoriesTab';
import {useColors} from '../../hooks/customHooks';

const Tab = createMaterialTopTabNavigator();

const FollowingTab = () => {
  const {color, backgroundColor} = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarLabelStyle: {textTransform: 'none', fontWeight: 'bold', color},
        tabBarStyle: {backgroundColor},
      }}>
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
