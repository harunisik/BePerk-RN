import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ModalActionType} from '../../../containers/ModalAction';
import ItemModal from '../ItemModal';
import {useStore} from '../../../containers/StoreContainer';
import {useRoute} from '@react-navigation/native';

const DotsButton = ({item}) => {
  const {dispatch} = useStore();
  const route = useRoute();

  return (
    <MaterialCommunityIcons
      name="dots-horizontal"
      size={24}
      onPress={() => {
        dispatch({
          type: ModalActionType.OPEN,
          modalInfo: {
            component: <ItemModal item={item} />,
            routeName: route.name,
          },
        });
      }}
    />
  );
};

export default DotsButton;
