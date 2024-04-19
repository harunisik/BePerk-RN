import {View, Text, Pressable} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {row, flex1, aiCenter, jcCenter, jcSpaceBetween} = common;

export const CreateNewAccountListItem = () => {
  const navigation = useNavigation();
  const title = 'Create a new account';

  return (
    <Pressable onPress={() => navigation.navigate(CreateNewAccount.name)}>
      <View style={[row, jcSpaceBetween, aiCenter]}>
        <Text>{title}</Text>
        <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
      </View>
    </Pressable>
  );
};

const CreateNewAccount = () => {
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>CreateNewAccount is under construction!</Text>
    </View>
  );
};

export default CreateNewAccount;
