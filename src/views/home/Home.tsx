import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForYouTab from './ForYouTab';
import FollowingTab from './FollowingTab';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import common from '../../styles/sharedStyles';
import Search from '../doves/Search';
import {useNavigation} from '@react-navigation/native';
import Activity from '../doves/Activity';
import {useState} from 'react';
import Explore from './Explore';

const {row, cGap15} = common;

const HeaderRight = () => {
  const navigation = useNavigation();

  return (
    <View style={[row, cGap15]}>
      <MaterialCommunityIcons
        name="bell"
        onPress={() => navigation.navigate(Activity.name)}
        size={22}
        color="dodgerblue"
      />
      <FontAwesome6
        name="envelope"
        onPress={() => Alert.alert('Under construction!')}
        size={22}
        color="dodgerblue"
      />
    </View>
  );
};

const HeaderTitleButton = ({isSelected, onPress, label}) => {
  return (
    <TouchableWithoutFeedback>
      <Text
        style={[
          styles.default,
          isSelected ? styles.selected : styles.nonSelected,
        ]}
        onPress={onPress}>
        {label}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const HeaderTitle = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState([true, false]);

  const handlePress = index => {
    setSelected([index === 0, index === 1]);
  };

  return (
    <View style={row}>
      <HeaderTitleButton
        label="For You"
        isSelected={selected[0]}
        onPress={() => {
          handlePress(0);
          navigation.setOptions({headerTransparent: true});
          navigation.navigate(ForYouTab.name);
        }}
      />
      <HeaderTitleButton
        label="Following"
        isSelected={selected[1]}
        onPress={() => {
          handlePress(1);
          navigation.setOptions({headerTransparent: false});
          navigation.navigate(FollowingTab.name);
        }}
      />
    </View>
  );
};

export const HomeScreenOptions = ({navigation}) => {
  return {
    headerTransparent: true,
    headerTitle: HeaderTitle,
    headerLeft: () => (
      <View style={[row, cGap15]}>
        <MaterialIcons
          name="search"
          onPress={() => navigation.navigate(Search.name)}
          size={26}
          color="dodgerblue"
        />
        <Ionicons
          name="earth"
          onPress={() => navigation.navigate(Explore.name)}
          size={24}
          color="dodgerblue"
        />
      </View>
    ),
    headerRight: HeaderRight,
  };
};

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarStyle: {
          display: 'none',
        },
      }}>
      <Tab.Screen name={ForYouTab.name} component={ForYouTab} />
      <Tab.Screen name={FollowingTab.name} component={FollowingTab} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  default: {
    color: 'dodgerblue',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 18,
  },
  selected: {
    backgroundColor: 'red',
  },
  nonSelected: {
    backgroundColor: 'transparent',
  },
});

export default Home;
