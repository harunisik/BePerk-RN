import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';

export const PrivacyPolicyListItem = ({navigation}) => {
  const title = 'Privacy policy';

  return (
    <TouchableOpacity onPress={() => navigation.navigate(PrivacyPolicy.name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const PrivacyPolicy = () => {
  return (
    <View style={common.centered}>
      <Text>PrivacyPolicy Under construction!</Text>
    </View>
  );
};

export default PrivacyPolicy;
