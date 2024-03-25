import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import Search from '../doves/Search';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {AddDoveModal} from '../../components/common/AddModal';

const {row, cGap15} = common;

const HeaderRight = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[row, cGap15]}>
      <MaterialCommunityIcons
        name="plus-circle"
        size={26}
        color="dodgerblue"
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <AddDoveModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

const StoriesScreenOptions = () => {
  const navigation = useNavigation();

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

export default StoriesScreenOptions;
