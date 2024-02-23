import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeTab from './HomeTab';
import DoveTab from './DoveTab';

const Doves = () => {
  const Tab = createMaterialTopTabNavigator();
  const {flex1} = common;

  return (
    <View style={[flex1]}>
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
            doRefresh: false,
            buttonText: "Post what's on your mind",
            inputTextPlaceHolder: "What's on your mind?",
            title: 'Post Dove',
            navigateTo: DoveTab.name,
          }}
        />
        <Tab.Screen
          name="TestimonyTab"
          component={DoveTab}
          options={{tabBarLabel: 'Testimony'}}
          initialParams={{
            subtype: 1,
            doRefresh: false,
            buttonText: 'Write what God has done for you!',
            inputTextPlaceHolder: 'Share a testimony',
            title: 'Post Testimony',
            navigateTo: 'TestimonyTab',
          }}
        />
        <Tab.Screen
          name="PrayerTab"
          component={DoveTab}
          options={{tabBarLabel: 'Prayer'}}
          initialParams={{
            subtype: 2,
            doRefresh: false,
            buttonText: 'Share a prayer request!',
            inputTextPlaceHolder: 'Share a prayer request',
            title: 'Post Prayer Request',
            navigateTo: 'PrayerTab',
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Doves;
