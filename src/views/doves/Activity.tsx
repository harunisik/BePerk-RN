import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ActivityTab from './ActivityTab';

const Activity = () => {
  const Tab = createMaterialTopTabNavigator();
  const {flex1} = common;

  return (
    <View style={[flex1]}>
      <Tab.Navigator
        screenOptions={{lazy: true, tabBarLabelStyle: {textTransform: 'none'}}}>
        <Tab.Screen
          name="Activity.All"
          component={ActivityTab}
          options={{tabBarLabel: 'All'}}
          initialParams={{
            filter: 0,
          }}
        />
        <Tab.Screen
          name="Activity.Followers"
          component={ActivityTab}
          options={{tabBarLabel: 'Followers'}}
          initialParams={{
            filter: 1,
          }}
        />
        <Tab.Screen
          name="Activity.Likes"
          component={ActivityTab}
          options={{tabBarLabel: 'Likes'}}
          initialParams={{
            filter: 2,
          }}
        />
        <Tab.Screen
          name="Activity.Comments"
          component={ActivityTab}
          options={{tabBarLabel: 'Comments'}}
          initialParams={{
            filter: 3,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Activity;
