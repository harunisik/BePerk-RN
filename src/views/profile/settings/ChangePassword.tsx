import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';

export const ChangePasswordListItem = ({navigation}) => {
  const title = 'Change password';

  return (
    <TouchableOpacity onPress={() => navigation.navigate(ChangePassword.name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const ChangePassword = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>ChangePassword Under construction!</Text>
    </View>
  );
};

export default ChangePassword;
