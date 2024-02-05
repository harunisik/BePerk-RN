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
  const {flex1, aiCenter, jcCenter} = common;
  return (
    <View style={[flex1, aiCenter, jcCenter]}>
      <Text>EditProfile Under construction!</Text>
    </View>
  );
};

export default EditProfile;
