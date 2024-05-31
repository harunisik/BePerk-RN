import {useNavigation} from '@react-navigation/native';
import UserSearch, {
  ChatShareHeaderRight,
} from '../../../views/profile/UserSearch';
import {ShareIcon} from '../Icons';

interface ShareButtonProps {
  id: number;
  type: number;
  color?: string;
}

const ShareButton = ({id, type, color}: ShareButtonProps) => {
  const navigation = useNavigation();

  return (
    <ShareIcon
      color={color}
      onPress={() =>
        navigation.navigate(UserSearch.name, {
          headerRightComp: ChatShareHeaderRight.name,
          headerRightProps: {itemId: id, type},
        })
      }
    />
  );
};

export default ShareButton;
