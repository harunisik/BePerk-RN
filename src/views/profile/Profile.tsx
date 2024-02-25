import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import ProfileTabGroup from '../../components/profile/ProfileTabGroup';
import UserInfo from '../../components/profile/UserInfo';
import {
  useAddFollowing,
  useDeleteFollowing,
  useGetUserProfile,
} from '../../hooks/userHooks';
import ProfileButtonGroup from '../../components/profile/ProfileButtonGroup';
import {useEffect, useState} from 'react';
import {useStore} from '../../containers/StoreContainer';

const Profile = ({navigation, route}) => {
  const [isFollowing, setIsFollowing] = useState(0);
  const {
    store: {
      authResult: {id: currentUserId},
    },
  } = useStore();
  const {
    params: {userId: id},
  } = route;

  const {flex1} = common;

  const {data} = useGetUserProfile({id});

  const handleAddFollowing = useAddFollowing(() => setIsFollowing(1));
  const handleDeleteFollowing = useDeleteFollowing(() => setIsFollowing(0));

  const handlePressFollowing = () => {
    if (isFollowing === 0) {
      handleAddFollowing.mutate({id});
    } else {
      handleDeleteFollowing.mutate({id});
    }
  };

  useEffect(() => {
    setIsFollowing(data?.i_following);
  }, [data]);

  return (
    <View style={[flex1]}>
      <UserInfo data={data} />
      <ProfileButtonGroup
        navigation={navigation}
        onPressFollowing={handlePressFollowing}
        pressButtonTitle={isFollowing === 1 ? 'Following' : 'Follow'}
        isCurrentUser={currentUserId === id}
      />
      <ProfileTabGroup userId={id} />
    </View>
  );
};

export default Profile;
