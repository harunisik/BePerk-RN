import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ModalActionType} from '../../../containers/ModalAction';
import ItemModal from '../ItemModal';
import {useStore} from '../../../containers/StoreContainer';

const DotsButton = ({item, onDeleteItem = () => {}}) => {
  const {dispatch} = useStore();

  return (
    <MaterialCommunityIcons
      name="dots-horizontal"
      size={24}
      onPress={() => {
        dispatch({
          type: ModalActionType.OPEN,
          modalInfo: {
            component: <ItemModal item={item} onDeleteItem={onDeleteItem} />,
          },
        });
      }}
    />
  );
};

export default DotsButton;
