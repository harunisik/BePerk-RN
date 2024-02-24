import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PostsTab from '../../views/profile/PostsTab';
import DovesTab from '../../views/profile/DovesTab';
import StoriesTab from '../../views/profile/StoriesTab';
import common from '../../styles/sharedStyles';

const ProfileTabGroup = ({userId}) => {
  const Tab = createMaterialTopTabNavigator();

  const {flex1} = common;

  return (
    <View style={[flex1]}>
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          tabBarLabelStyle: {textTransform: 'none'},
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
        <Tab.Screen
          name={DovesTab.name}
          component={DovesTab}
          options={{tabBarLabel: 'Doves'}}
          initialParams={{userId}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default ProfileTabGroup;
