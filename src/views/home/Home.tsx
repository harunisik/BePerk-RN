import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForYouTab from './ForYouTab';
import FollowingTab from './FollowingTab';
import {Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import common from '../../styles/sharedStyles';
import Search from '../doves/Search';
import {useNavigation, useRoute} from '@react-navigation/native';
import Activity from '../doves/Activity';
import {useEffect, useState} from 'react';
import Explore from './Explore';
import Messages from '../profile/Messages';
import notifee from '@notifee/react-native';
import {badgeCount} from '../../services/UserService';
import {useQuery} from '../../hooks/reactQueryHooks';
import Badge from '../../components/common/Badge';
import Text from '../../components/common/Text';
import View from '../../components/common/View';

const {row, cGap15} = common;

const HeaderLeft = () => {
  const navigation = useNavigation();

  return (
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
  );
};

const HeaderRight = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {badgeCount},
  } = route;

  return (
    <View style={[row, cGap15]}>
      <MaterialCommunityIcons
        name="bell"
        onPress={() => navigation.navigate(Activity.name)}
        size={22}
        color="dodgerblue"
      />
      <Pressable onPress={() => navigation.navigate(Messages.name)}>
        <FontAwesome6 name="envelope" size={22} color="dodgerblue" />
        {badgeCount > 0 && <Badge value={badgeCount} />}
      </Pressable>
    </View>
  );
};

const HeaderTitleButton = ({onPress, label, containerStyle, labelStyle}) => {
  return (
    <Pressable style={containerStyle}>
      <Text style={labelStyle} onPress={onPress}>
        {label}
      </Text>
    </Pressable>
  );
};

const HeaderTitle = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState([true, false]);

  const handlePress = index => {
    setSelected([index === 0, index === 1]);
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          columnGap: 3,
          borderWidth: 1,
          // borderColor: 'white',
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 5,
        },
      ]}>
      <HeaderTitleButton
        label="For You"
        containerStyle={{
          borderRadius: 20,
          backgroundColor: selected[0] ? 'dodgerblue' : 'transparent',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
        // labelStyle={{color: selected[0] ? 'white' : 'black'}}
        onPress={() => {
          handlePress(0);
          navigation.setOptions({headerTransparent: true});
          navigation.navigate(ForYouTab.name);
        }}
      />
      <HeaderTitleButton
        label="Following"
        containerStyle={{
          borderRadius: 20,
          backgroundColor: selected[1] ? 'dodgerblue' : 'transparent',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
        // labelStyle={{color: 'white'}}
        onPress={() => {
          handlePress(1);
          navigation.setOptions({headerTransparent: false});
          navigation.navigate(FollowingTab.name);
        }}
      />
    </View>
  );
};

export const HomeScreenOptions = () => {
  return {
    headerTransparent: true,
    headerTitleAlign: 'center',
    headerTitle: HeaderTitle,
    headerLeft: HeaderLeft,
    headerRight: HeaderRight,
  };
};

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  const navigation = useNavigation();
  const {data} = useQuery(badgeCount);

  useEffect(() => {
    if (data?.messages_unread) {
      notifee.setBadgeCount(data?.messages_unread);
      navigation.setParams({badgeCount: data?.messages_unread});
    }
  }, [data]);

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
    // borderColor: 'white',
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
