import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import {useStore} from '../../../containers/StoreContainer';
import {ModalActionType} from '../../../containers/ModalAction';
import Button from './Button';

const CopyLinkButton = ({item}) => {
  const {dispatch} = useStore();

  return (
    <Button
      onPress={() => {
        dispatch({type: ModalActionType.CLOSE});
        showMessage({message: 'Link copied'});
        if (item.type === 1 || item.type === 0) {
          Clipboard.setString(`beperk://post?id=${item.id}&type=${item.type}`);
        } else {
          Clipboard.setString(`beperk://dove?id=${item.id}`);
        }
      }}
      title="Copy Link"
      icon="content-copy"
    />
  );
};

export default CopyLinkButton;
