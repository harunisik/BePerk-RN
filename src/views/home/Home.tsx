import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForYouTab from './ForYouTab';
import FollowingTab from './FollowingTab';
import {Pressable} from 'react-native';
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
import {
  BellIcon,
  EarthIcon,
  EnvelopeIcon,
  SearchIcon,
} from '../../components/common/Icons';
import {colors, useColors} from '../../hooks/customHooks';

const {row, cGap15} = common;

const HeaderLeft = () => {
  const navigation = useNavigation();

  return (
    <View style={[row, cGap15]} disableTheme>
      <SearchIcon
        onPress={() => navigation.navigate(Search.name)}
        color={colors.blue}
      />
      <EarthIcon
        onPress={() => navigation.navigate(Explore.name)}
        color={colors.blue}
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
    <View style={[row, cGap15]} disableTheme>
      <BellIcon
        onPress={() => navigation.navigate(Activity.name)}
        color={colors.blue}
      />
      <Pressable onPress={() => navigation.navigate(Messages.name)}>
        <EnvelopeIcon color={colors.blue} />
        {badgeCount > 0 && <Badge value={badgeCount} />}
      </Pressable>
    </View>
  );
};

const HeaderTitleButton = ({onPress, label, labelStyle, containerStyle}) => {
  return (
    <Pressable style={containerStyle}>
      <Text style={[{fontWeight: '500'}, labelStyle]} onPress={onPress}>
        {label}
      </Text>
    </Pressable>
  );
};

const HeaderTitle = () => {
  const {color, backgroundColor} = useColors();
  const navigation = useNavigation();
  const [selected, setSelected] = useState([true, false]);

  const handlePress = index => {
    setSelected([index === 0, index === 1]);
  };

  return (
    <View
      disableTheme={selected[0]}
      style={[
        {
          flexDirection: 'row',
          columnGap: 3,
          borderWidth: 1,
          borderColor: 'white',
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
        labelStyle={{color: selected[0] ? 'white' : color}}
        containerStyle={{
          borderRadius: 20,
          backgroundColor: selected[0] ? '#0AAEEF' : 'transparent',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
        onPress={() => {
          handlePress(0);
          navigation.setOptions({
            headerTransparent: true,
            headerStyle: {backgroundColor: 'transparent'},
          });
          navigation.navigate(ForYouTab.name);
        }}
      />
      <HeaderTitleButton
        label="Following"
        labelStyle={{color: selected[0] ? 'white' : color}}
        containerStyle={{
          borderRadius: 20,
          backgroundColor: selected[1] ? '#0AAEEF' : 'transparent',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
        onPress={() => {
          handlePress(1);
          navigation.setOptions({
            headerTransparent: false,
            headerStyle: {backgroundColor},
          });
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
  const {color} = useColors();
  const navigation = useNavigation();
  const {data} = useQuery(badgeCount);

  useEffect(() => {
    if (data?.messages_unread) {
      notifee.setBadgeCount(data?.messages_unread);
      navigation.setParams({badgeCount: data?.messages_unread});
    }
  }, [data]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {backgroundColor: 'transparent'},
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarLabelStyle: {textTransform: 'none', fontWeight: 'bold', color},
        tabBarStyle: {
          display: 'none',
        },
      }}>
      <Tab.Screen name={ForYouTab.name} component={ForYouTab} />
      <Tab.Screen name={FollowingTab.name} component={FollowingTab} />
    </Tab.Navigator>
  );
};

export default Home;
