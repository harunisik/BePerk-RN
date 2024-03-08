import {showMessage} from 'react-native-flash-message';
import {useDeletePost} from '../../../hooks/userHooks';
import {useStore} from '../../../containers/StoreContainer';
import {ModalActionType} from '../../../containers/ModalAction';
import Button from './Button';

interface DeleteButtonProps {
  item: any;
}

const DeleteButton = ({item}: DeleteButtonProps) => {
  const {
    dispatch,
    store: {
      modalInfo: {routeName},
    },
  } = useStore();
  const deletePost = useDeletePost(routeName);

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
