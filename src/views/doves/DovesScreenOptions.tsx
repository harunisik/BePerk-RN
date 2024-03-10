import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import {useStore} from '../../containers/StoreContainer';
import {ModalActionType} from '../../containers/ModalAction';
import AddDoveModal from '../../components/doves/AddDoveModal';
import Activity from './Activity';
import Search from './Search';
import {useNavigation} from '@react-navigation/native';

const HeaderRight = () => {
  const {dispatch} = useStore();
  const navigation = useNavigation();
  const {row, cGap15} = common;

  return (
    <View style={[row, cGap15]}>
      <MaterialCommunityIcons
        name="plus-circle"
        size={26}
        color="dodgerblue"
        onPress={() => {
          dispatch({
            type: ModalActionType.OPEN,
            modalInfo: {
              component: <AddDoveModal navigation={navigation} />,
            },
          });
        }}
      />
      <MaterialCommunityIcons
        name="bell"
        onPress={() => navigation.navigate(Activity.name)}
        size={26}
        color="dodgerblue"
      />
    </View>
  );
};

const DovesScreenOptions = () => {
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

export default DovesScreenOptions;