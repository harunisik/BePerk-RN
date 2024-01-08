import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import Home from './src/views/Home';
import Stories from './src/views/Stories';
import Doves from './src/views/Doves';
import Profile from './src/views/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyBottomSheet from './src/components/MyBottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <PaperProvider>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen name="Stories" component={Stories} />
            <Tab.Screen
              name="Add"
              component={MyBottomSheet}
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="plus" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen name="Doves" component={Doves} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
