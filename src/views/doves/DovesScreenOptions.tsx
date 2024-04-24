import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import Activity from './Activity';
import Search from './Search';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {AddDoveModal} from '../add/AddModal';

const {row, cGap15} = common;

const HeaderRight = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[row, cGap15]}>
      <MaterialCommunityIcons
        name="plus-circle"
        size={22}
        color="dodgerblue"
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <MaterialCommunityIcons
        name="bell"
        onPress={() => navigation.navigate(Activity.name)}
        size={22}
        color="dodgerblue"
      />
      <AddDoveModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

const DovesScreenOptions = ({navigation}) => {
  // const navigation = useNavigation();

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

export default DovesScreenOptions;
