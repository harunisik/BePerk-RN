import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';

export const DeleteAccountListItem = ({navigation}) => {
  const title = 'Delete account';

  return (
    <TouchableOpacity onPress={() => navigation.navigate(DeleteAccount.name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const DeleteAccount = () => {
  return (
    <View style={common.centered}>
      <Text>DeleteAccount Under construction!</Text>
    </View>
  );
};

export default DeleteAccount;
