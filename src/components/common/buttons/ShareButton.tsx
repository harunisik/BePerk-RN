import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Followers, {
  ChatShareHeaderRight,
} from '../../../views/profile/Followers';

interface ShareButtonProps {
  item: any;
  size?: number;
  color?: string;
}

const ShareButton = ({
  item,
  size = 26,
  color = 'dodgerblue',
}: ShareButtonProps) => {
  const navigation = useNavigation();

  return (
    <MaterialCommunityIcons
      name="share-outline"
      size={size}
      color={color}
      onPress={() =>
        navigation.navigate(Followers.name, {
          headerRightComp: ChatShareHeaderRight.name,
          headerRightProps: {itemId: item.id, type: item.type},
        })
      }
    />
  );
};

export default ShareButton;
