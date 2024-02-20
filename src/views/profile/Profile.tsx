import {View, Button, Alert} from 'react-native';
import {useStore} from '../../containers/StoreContainer';
import EditProfile from './settings/EditProfile';
import {useQuery} from 'react-query';
import {getUserProfile} from '../../services/UserService';
import common from '../../styles/sharedStyles';
import ProfileTabGroup from '../../components/profile/ProfileTabGroup';
import UserInfo from '../../components/profile/UserInfo';

const Profile = ({navigation}) => {
  const {
    store: {
      authResult: {id},
    },
  } = useStore();

  const {data} = useQuery({
    queryKey: ['getUserProfile', {id}],
    queryFn: getUserProfile,
  });

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
      <ProfileTabGroup />
    </View>
  );
};

export default Profile;
