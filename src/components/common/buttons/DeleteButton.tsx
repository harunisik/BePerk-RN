import {showMessage} from 'react-native-flash-message';
import {useStore} from '../../../containers/StoreContainer';
import {ModalActionType} from '../../../containers/ModalAction';
import Button from './Button';
import {useCustomMutation as useMutation} from '../../../hooks/commonHooks';
import {deletePost as userDeletePost} from '../../../services/UserService';

interface DeleteButtonProps {
  item: any;
}

const DeleteButton = ({item}: DeleteButtonProps) => {
  const {dispatch} = useStore();

  const deletePost = useMutation(userDeletePost);

  const handlePress = () =>
    deletePost.mutate(
      {
        items: JSON.stringify([{id: item.id, type: item.type}]),
      },
      {
        onSuccess: () => {
          dispatch({type: ModalActionType.CLOSE});
          showMessage({message: 'Post deleted'});
        },
      },
    );

  return (
    <Button
      title="Delete"
      onPress={handlePress}
      icon="delete"
      iconColor="red"
    />
  );
};

export default DeleteButton;
