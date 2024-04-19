import {View, Text, Pressable} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {row, flex1, aiCenter, jcCenter, jcSpaceBetween} = common;

export const ChangePasswordListItem = () => {
  const navigation = useNavigation();
  const title = 'Change password';

  return (
    <Pressable onPress={() => navigation.navigate(ChangePassword.name)}>
      <View style={[row, jcSpaceBetween, aiCenter]}>
        <Text>{title}</Text>
        <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
      </View>
    </Pressable>
  );
};

const ChangePassword = () => {
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>ChangePassword is under construction!</Text>
    </View>
  );
};

export default ChangePassword;
