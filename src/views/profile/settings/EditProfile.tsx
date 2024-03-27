import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';

export const EditProfileListItem = () => {
  const navigation = useNavigation();
  const title = 'Edit profile';

  return (
    <TouchableOpacity onPress={() => navigation.navigate(EditProfile.name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const EditProfile = () => {
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>EditProfile is under construction!</Text>
    </View>
  );
};

export default EditProfile;
