import {Text, Pressable} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';

const {flex1, jcCenter, row, aiCenter, jcSpaceBetween} = common;

const pageTitle = 'Switch account';

export const SwitchAccountListItem = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(SwitchAccount.name)}
      style={[row, jcSpaceBetween, aiCenter]}>
      <Text>{pageTitle}</Text>
      <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
    </Pressable>
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
