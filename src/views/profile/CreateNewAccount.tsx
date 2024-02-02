import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../styles/sharedStyles';

export const CreateNewAccountListItem = ({navigation}) => {
  const title = 'Create a new account';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(CreateNewAccount.name, {title})}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const CreateNewAccount = () => {
  return (
    <View style={common.centered}>
      <Text>CreateNewAccount Under construction!</Text>
    </View>
  );
};

export default CreateNewAccount;
