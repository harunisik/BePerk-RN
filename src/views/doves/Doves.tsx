import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from './Home';
import Dove from './Dove';
import Testimony from './Testimony';
import Prayer from './Prayer';

const Doves = () => {
  const Tab = createMaterialTopTabNavigator();
  const {flex1} = common;

  return (
    <View style={[flex1]}>
      <Tab.Navigator screenOptions={{lazy: true}}>
        <Tab.Screen name={Home.name} component={Home} />
        <Tab.Screen name={Dove.name} component={Dove} />
        <Tab.Screen name={Testimony.name} component={Testimony} />
        <Tab.Screen name={Prayer.name} component={Prayer} />
      </Tab.Navigator>
    </View>
  );
};

export default Doves;
