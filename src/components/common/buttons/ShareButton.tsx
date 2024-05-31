import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import UserSearch, {
  ChatShareHeaderRight,
} from '../../../views/profile/UserSearch';

interface ShareButtonProps {
  id: number;
  type: number;
  size?: number;
  color?: string;
}

const ShareButton = ({id, type, size = 26, color}: ShareButtonProps) => {
  const navigation = useNavigation();

  return (
    <MaterialCommunityIcons
      name="share-outline"
      size={size}
      {...(color && {color})}
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
