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
          initialParams={{subtype: 0}}
        />
        <Tab.Screen
          name="TestimonyTab"
          component={DoveTab}
          options={{tabBarLabel: 'Testimony'}}
          initialParams={{subtype: 1}}
        />
        <Tab.Screen
          name="PrayerTab"
          component={DoveTab}
          options={{tabBarLabel: 'Prayer'}}
          initialParams={{subtype: 2}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Doves;
