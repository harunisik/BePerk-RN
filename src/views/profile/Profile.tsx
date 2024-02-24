import {View, Button, Alert} from 'react-native';
import EditProfile from './settings/EditProfile';
import common from '../../styles/sharedStyles';
import ProfileTabGroup from '../../components/profile/ProfileTabGroup';
import UserInfo from '../../components/profile/UserInfo';
import {useGetUserProfile} from '../../hooks/userHooks';

const Profile = ({navigation, route}) => {
  const {
    params: {userId: id},
  } = route;

  const {data} = useGetUserProfile({id});

  const {aiCenter, row, flex1, jcSpaceAround} = common;

  return (
    <View style={[flex1]}>
      <UserInfo data={data} />
      <View style={[aiCenter, row, jcSpaceAround]}>
        <Button
          onPress={() => navigation.navigate(EditProfile.name)}
          title="Edit Profile"
        />
        <Button
          onPress={() => Alert.alert('Under construction!')}
          title="Messages"
        />
      </View>
      <ProfileTabGroup userId={id} />
    </View>
  );
};

export default Profile;
