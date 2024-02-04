import {View, Text, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';

export const EditProfileListItem = ({navigation}) => {
  const title = 'Edit profile';

  return (
    <TouchableOpacity onPress={() => navigation.navigate(EditProfile.name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const EditProfile = ({navigation}) => {
  return (
    <View style={common.centered}>
      <Text>EditProfile Under construction!</Text>
    </View>
  );
};

export default EditProfile;
