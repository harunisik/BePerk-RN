import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Featured from './Featured';
import FeaturedItemDetails from './FeaturedItemDetails';
import FeaturedScreenOptions from './FeaturedScreenOptions';

const Stack = createNativeStackNavigator();

const FeaturedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Featured.name}
        component={Featured}
        options={FeaturedScreenOptions}
      />
      <Stack.Screen
        name={FeaturedItemDetails.name}
        component={FeaturedItemDetails}
        options={{
          headerTransparent: true,
          title: '',
          headerBackTitleVisible: false,
        }}
        initialParams={{data: []}}
      />
    </Stack.Navigator>
  );
};

export default FeaturedStack;
