import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import EditProfile from '../../views/profile/settings/EditProfile';
import common from '../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';

const ProfileButtonGroup = ({
  onPressFollowing,
  pressButtonTitle,
  isAuthUser = true,
}) => {
  const navigation = useNavigation();
  const {aiCenter, row, jcCenter, p10} = common;

  return (
    <View style={[aiCenter, row, jcCenter, p10]}>
      {isAuthUser ? (
        <TouchableOpacity
          style={[styles.button, aiCenter, row]}
          onPress={() => navigation.navigate(EditProfile.name)}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, aiCenter, row]}
          onPress={onPressFollowing}>
          <Text>{pressButtonTitle}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.button, aiCenter, row]}
        onPress={() => Alert.alert('Under construction!')}>
        <Text>Messages</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});

export default ProfileButtonGroup;
