import {useDeletePost} from '../../../hooks/userHooks';
import Button from './Button';

interface DeleteButtonProps {
  item: any;
}

const DeleteButton = ({item}: DeleteButtonProps) => {
  const deletePost = useDeletePost();

  const handlePress = () =>
    deletePost.mutate({
      items: JSON.stringify([{id: item.id, type: item.type}]),
    });

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
