import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';

export const CreateNewAccountListItem = () => {
  const navigation = useNavigation();
  const title = 'Create a new account';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(CreateNewAccount.name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const CreateNewAccount = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>CreateNewAccount is under construction!</Text>
    </View>
  );
};

export default CreateNewAccount;
