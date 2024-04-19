import {View, Text, Pressable} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {row, flex1, aiCenter, jcCenter, jcSpaceBetween} = common;

export const DeleteAccountListItem = () => {
  const navigation = useNavigation();
  const title = 'Delete account';

  return (
    <Pressable onPress={() => navigation.navigate(DeleteAccount.name)}>
      <View style={[row, jcSpaceBetween, aiCenter]}>
        <Text>{title}</Text>
        <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
      </View>
    </Pressable>
  );
};

const DeleteAccount = () => {
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>DeleteAccount is under construction!</Text>
    </View>
  );
};

export default DeleteAccount;
