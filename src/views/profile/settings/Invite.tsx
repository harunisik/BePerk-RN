import common from '../../../styles/sharedStyles';
import Text from '../../../components/common/Text';
import View from '../../../components/common/View';
import {SettingsListItem1} from './Settings';
import {useNavigation} from '@react-navigation/native';

const {flex1, aiCenter, jcCenter} = common;

export const InviteListItem = () => {
  const navigation = useNavigation();

  return (
    <SettingsListItem1
      onPress={() => navigation.navigate(Invite.name)}
      title="Invite"
    />
  );
};

const Invite = () => {
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>Invite is under construction!</Text>
    </View>
  );
};

export default Invite;
