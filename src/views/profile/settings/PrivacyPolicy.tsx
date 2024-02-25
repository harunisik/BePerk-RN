import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';

export const PrivacyPolicyListItem = () => {
  const navigation = useNavigation();
  const title = 'Privacy policy';

  return (
    <TouchableOpacity onPress={() => navigation.navigate(PrivacyPolicy.name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const PrivacyPolicy = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>PrivacyPolicy Under construction!</Text>
    </View>
  );
};

export default PrivacyPolicy;
