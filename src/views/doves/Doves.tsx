import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeTab from './HomeTab';
import DoveTab from './DoveTab';
import {AddDoveModal} from '../add/AddModal';
import common from '../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import Search from './Search';
import Activity from './Activity';
import View from '../../components/common/View';
import {useColors} from '../../hooks/customHooks';
import {BellIcon, PlusIcon} from '../../components/common/Icons';

const {row, cGap15} = common;

const HeaderRight = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={[row, cGap15]}>
      <PlusIcon
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <BellIcon onPress={() => navigation.navigate(Activity.name)} />
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
      <Search onPress={() => navigation.navigate(Search.name)} />
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
