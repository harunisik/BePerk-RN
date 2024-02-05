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
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>Invite Under construction!</Text>
    </View>
  );
};

export default Invite;
