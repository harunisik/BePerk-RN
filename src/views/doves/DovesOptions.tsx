import {Alert, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import {useStore} from '../../containers/StoreContainer';
import {ModalActionType} from '../../containers/ModalAction';
import AddDoveModal from '../../components/doves/AddDoveModal';

const HeaderRight = ({navigation}) => {
  const {dispatch} = useStore();
  const {row, cGap15} = common;

  return (
    <View style={[row, cGap15]}>
      <MaterialCommunityIcons
        name="plus-circle"
        size={26}
        color="blue"
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
        onPress={() => Alert.alert('Under construction')}
        size={26}
        color="blue"
      />
    </View>
  );
};

const DovesOptions = ({navigation}) => {
  return {
    title: '',
    headerLeft: () => (
      <MaterialIcons
        name="search"
        onPress={() => Alert.alert('Under construction')}
        size={26}
      />
    ),
    headerRight: () => <HeaderRight navigation={navigation} />,
  };
};

export default DovesOptions;
