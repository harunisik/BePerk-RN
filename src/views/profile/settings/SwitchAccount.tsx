import common from '../../../styles/sharedStyles';
import Text from '../../../components/common/Text';
import View from '../../../components/common/View';
import {SettingsListItem1} from './Settings';
import {useNavigation} from '@react-navigation/native';

const {flex1, jcCenter, aiCenter} = common;

const pageTitle = 'Switch account';

export const SwitchAccountListItem = () => {
  const navigation = useNavigation();

  return (
    <SettingsListItem1
      onPress={() => navigation.navigate(SwitchAccount.name)}
      title={pageTitle}
    />
  );
};

const SwitchAccount = () => {
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>SwitchAccount is under construction!</Text>
    </View>
  );
};

export default SwitchAccount;
