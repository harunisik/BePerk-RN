import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import ProfileTabGroup from '../../components/profile/ProfileTabGroup';
import UserInfo from '../../components/profile/UserInfo';
import ProfileButtonGroup from '../../components/profile/ProfileButtonGroup';
import {useEffect, useState} from 'react';
import {useStore} from '../../containers/StoreContainer';
import {useRoute} from '@react-navigation/native';
import {
  useCustomQuery as useQuery,
  useCustomMutation as useMutation,
} from '../../hooks/commonHooks';
import {
  deleteFollowing as userDeleteFollowing,
  addFollowing as userAddFollowing,
  getUserProfile,
} from '../../services/UserService';

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(0);
  const route = useRoute();
  const {
    store: {
      authResult: {id: currentUserId},
    },
  } = useStore();
  const {
    params: {userId: id},
  } = route;

  const {flex1} = common;

  const {data} = useQuery(getUserProfile, {id});
  const addFollowing = useMutation(userAddFollowing);
  const deleteFollowing = useMutation(userDeleteFollowing);

  const handlePressFollowing = () => {
    if (isFollowing === 0) {
      addFollowing.mutate({id}, {onSuccess: () => setIsFollowing(1)});
    } else {
      deleteFollowing.mutate({id}, {onSuccess: () => setIsFollowing(0)});
    }
  };

  useEffect(() => {
    setIsFollowing(data?.i_following);
  }, [data]);

  return (
    <View style={[flex1]}>
      <UserInfo data={data} />
      <ProfileButtonGroup
        onPressFollowing={handlePressFollowing}
        pressButtonTitle={isFollowing === 1 ? 'Following' : 'Follow'}
        isCurrentUser={currentUserId === id}
      />
      <ProfileTabGroup userId={id} />
    </View>
  );
};

export default Profile;
