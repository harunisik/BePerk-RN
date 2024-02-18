import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeTab from './HomeTab';
import DoveTab from './DoveTab';
import TestimonyTab from './TestimonyTab';
import PrayerTab from './PrayerTab';

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
        />
        <Tab.Screen
          name={TestimonyTab.name}
          component={TestimonyTab}
          options={{tabBarLabel: 'Testimony'}}
        />
        <Tab.Screen
          name={PrayerTab.name}
          component={PrayerTab}
          options={{tabBarLabel: 'Prayer'}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Doves;
