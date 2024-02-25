import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';

export const DeleteAccountListItem = () => {
  const navigation = useNavigation();
  const title = 'Delete account';

  return (
    <TouchableOpacity onPress={() => navigation.navigate(DeleteAccount.name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const DeleteAccount = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>DeleteAccount Under construction!</Text>
    </View>
  );
};

export default DeleteAccount;
