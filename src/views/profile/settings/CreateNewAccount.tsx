import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';

export const CreateNewAccountListItem = ({navigation}) => {
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
      <Text>CreateNewAccount Under construction!</Text>
    </View>
  );
};

export default CreateNewAccount;
