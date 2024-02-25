import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';

export const ChangePasswordListItem = () => {
  const navigation = useNavigation();
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
