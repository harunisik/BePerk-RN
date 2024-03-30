import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ModalActionType} from '../../../containers/ModalAction';
import ItemModal from '../ItemModal';
import {useStore} from '../../../containers/StoreContainer';
import {useRoute} from '@react-navigation/native';

interface DotsButtonProps {
  item: any;
  size?: number;
  color?: string;
}

const DotsButton = ({
  item,
  size = 24,
  color = 'dodgerblue',
}: DotsButtonProps) => {
  const {dispatch} = useStore();
  const route = useRoute();

  return (
    <MaterialCommunityIcons
      name="dots-horizontal"
      size={size}
      color={color}
      onPress={() => {
        dispatch({
          type: ModalActionType.OPEN,
          modalInfo: {
            component: <ItemModal item={item} />,
            routeName: route.key,
          },
        });
      }}
    />
  );
};

export default DotsButton;
