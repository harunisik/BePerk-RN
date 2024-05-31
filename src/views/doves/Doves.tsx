import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeTab from './HomeTab';
import DoveTab from './DoveTab';
import {AddDoveModal} from '../add/AddModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import Search from './Search';
import Activity from './Activity';
import View from '../../components/common/View';
import {useColors} from '../../hooks/customHooks';

const {row, cGap15} = common;

const HeaderRight = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={[row, cGap15]}>
      <MaterialCommunityIcons
        name="plus-circle"
        size={22}
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <MaterialCommunityIcons
        name="bell"
        onPress={() => navigation.navigate(Activity.name)}
        size={22}
      />
      <AddDoveModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

export const DovesScreenOptions = ({navigation}) => {
  return {
    title: '',
    headerLeft: () => (
      <MaterialIcons
        name="search"
        onPress={() => navigation.navigate(Search.name)}
        size={26}
      />
    ),
    headerRight: HeaderRight,
  };
};

const Tab = createMaterialTopTabNavigator();

const Doves = () => {
  const {color, backgroundColor} = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarLabelStyle: {textTransform: 'none', fontWeight: 'bold', color},
        tabBarStyle: {backgroundColor},
      }}>
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
