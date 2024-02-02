import {View, Text, TouchableOpacity} from 'react-native';
import common from '../styles/sharedStyles';

export const SwitchAccountListItem = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(SwitchAccount.name)}>
      <Text>Switch Account</Text>
    </TouchableOpacity>
  );
};

const SwitchAccount = () => {
  return (
    <View style={common.centered}>
      <Text>Switch Account Under construction!</Text>
    </View>
  );
};

export default SwitchAccount;
