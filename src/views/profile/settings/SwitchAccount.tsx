import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';

export const SwitchAccountListItem = ({navigation}) => {
  const title = 'Switch account';

  return (
    <TouchableOpacity onPress={() => navigation.navigate(SwitchAccount.name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const SwitchAccount = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>SwitchAccount Under construction!</Text>
    </View>
  );
};

export default SwitchAccount;
