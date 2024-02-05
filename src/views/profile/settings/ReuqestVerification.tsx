import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';

export const RequestVerificationListItem = ({navigation}) => {
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
      <Text>RequestVerification Under construction!</Text>
    </View>
  );
};

export default RequestVerification;
