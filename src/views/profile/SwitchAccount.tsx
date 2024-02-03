import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../styles/sharedStyles';

export const SwitchAccountListItem = ({navigation}) => {
  const title = 'Switch account';

  return (
    <TouchableOpacity onPress={() => navigation.navigate(SwitchAccount.name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const SwitchAccount = () => {
  return (
    <View style={common.centered}>
      <Text>SwitchAccount Under construction!</Text>
    </View>
  );
};

export default SwitchAccount;
