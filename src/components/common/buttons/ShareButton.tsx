import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Followers from '../../../views/profile/Followers';

const ShareButton = ({item}) => {
  const navigation = useNavigation();

  return (
    <MaterialCommunityIcons
      name="share-outline"
      size={26}
      color="dodgerblue"
      onPress={() =>
        navigation.navigate(Followers.name, {id: item.id, type: item.type})
      }
    />
  );
};

export default ShareButton;
