import {View} from 'react-native';
import {useStore} from '../../containers/StoreContainer';
import CopyLinkButton from './buttons/CopyLinkButton';
import DeleteButton from './buttons/DeleteButton';
import TurnOffButton from './buttons/TurnOffButton';
import ReportButton from './buttons/ReportButton';

const ItemModal = ({item, onDeleteItem = () => {}}) => {
  const {
    store: {
      authResult: {id, username},
    },
  } = useStore();

  return (
    <View>
      <CopyLinkButton item={item} />
      {id === item.user_id || username === item.username ? (
        <DeleteButton item={item} onDelete={onDeleteItem} />
      ) : (
        <View>
          <TurnOffButton item={item} />
          <ReportButton item={item} />
        </View>
      )}
    </View>
  );
};

export default ItemModal;
