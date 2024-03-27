import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';

export const RequestVerificationListItem = () => {
  const navigation = useNavigation();
  const title = 'Request verification';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(RequestVerification.name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const RequestVerification = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>RequestVerification is under construction!</Text>
    </View>
  );
};

export default RequestVerification;
