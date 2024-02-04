import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';

export const InviteListItem = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(Invite.name)}>
      <Text>Invite</Text>
    </TouchableOpacity>
  );
};

const Invite = () => {
  return (
    <View style={common.centered}>
      <Text>Invite Under construction!</Text>
    </View>
  );
};

export default Invite;
