import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PostsTab from '../../views/profile/PostsTab';
import DovesTab from '../../views/profile/DovesTab';
import StoriesTab from '../../views/profile/StoriesTab';

const Tab = createMaterialTopTabNavigator();

const ProfileTabGroup = ({userId}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarLabelStyle: {textTransform: 'none'},
      }}>
      <Tab.Screen
        name={PostsTab.name}
        component={PostsTab}
        options={{tabBarLabel: 'Posts'}}
        initialParams={{userId}}
      />
      <Tab.Screen
        name={StoriesTab.name}
        component={StoriesTab}
        options={{tabBarLabel: 'Stories'}}
        initialParams={{userId}}
      />
      <Tab.Screen
        name={DovesTab.name}
        component={DovesTab}
        options={{tabBarLabel: 'Doves'}}
        initialParams={{userId}}
      />
    </Tab.Navigator>
  );
};

export default ProfileTabGroup;
