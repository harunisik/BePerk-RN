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
  return (
    <View style={common.centered}>
      <Text>RequestVerification Under construction!</Text>
    </View>
  );
};

export default RequestVerification;
