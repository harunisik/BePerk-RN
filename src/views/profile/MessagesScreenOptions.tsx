import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Followers from './Followers';

const MessagesScreenOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <MaterialCommunityIcons
        name="file-document-edit-outline"
        size={26}
        color="dodgerblue"
        onPress={() => navigation.navigate(Followers.name)}
      />
    ),
  };
};

export default MessagesScreenOptions;
