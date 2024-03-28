import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeTab from './HomeTab';
import DoveTab from './DoveTab';

const Tab = createMaterialTopTabNavigator();

const Doves = () => {
  return (
    <Tab.Navigator
      screenOptions={{lazy: true, tabBarLabelStyle: {textTransform: 'none'}}}>
      <Tab.Screen
        name={HomeTab.name}
        component={HomeTab}
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name={DoveTab.name}
        component={DoveTab}
        options={{tabBarLabel: 'Dove'}}
        initialParams={{
          subtype: 0,
          buttonText: "Post what's on your mind",
          inputTextPlaceHolder: "What's on your mind?",
          title: 'Post Dove',
        }}
      />
      <Tab.Screen
        name="TestimonyTab"
        component={DoveTab}
        options={{tabBarLabel: 'Testimony'}}
        initialParams={{
          subtype: 1,
          buttonText: 'Write what God has done for you!',
          inputTextPlaceHolder: 'Share a testimony',
          title: 'Post Testimony',
        }}
      />
      <Tab.Screen
        name="PrayerTab"
        component={DoveTab}
        options={{tabBarLabel: 'Prayer'}}
        initialParams={{
          subtype: 2,
          buttonText: 'Share a prayer request!',
          inputTextPlaceHolder: 'Share a prayer request',
          title: 'Post Prayer Request',
        }}
      />
    </Tab.Navigator>
  );
};

export default Doves;
