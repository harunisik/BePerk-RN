import UserInfo from '../../components/profile/UserInfo';
import ProfileButtonGroup from '../../components/profile/ProfileButtonGroup';
import {useEffect, useState} from 'react';
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
import {Tabs} from 'react-native-collapsible-tab-view';
import PostsTab from './PostsTab';
import StoriesTab from './StoriesTab';
import DovesTab from './DovesTab';

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(0);
  const route = useRoute();
  const {
    params: {userId, isAuthUser},
  } = route;

  const {data, refetch, isFetching} = useQuery(getUserProfile, {id: userId});
  const addFollowing = useMutation(userAddFollowing);
  const deleteFollowing = useMutation(userDeleteFollowing);

  const handlePressFollowing = () => {
    if (isFollowing === 0) {
      addFollowing.mutate({id: userId}, {onSuccess: () => setIsFollowing(1)});
    } else {
      deleteFollowing.mutate(
        {id: userId},
        {onSuccess: () => setIsFollowing(0)},
      );
    }
  };

  useEffect(() => {
    setIsFollowing(data?.i_following);
  }, [data]);

  return (
    <Tabs.Container
      lazy
      renderHeader={() => (
        <>
          <UserInfo data={data} />
          <ProfileButtonGroup
            onPressFollowing={handlePressFollowing}
            pressButtonTitle={isFollowing === 1 ? 'Following' : 'Follow'}
            isAuthUser={isAuthUser}
          />
        </>
      )}>
      <Tabs.Tab name="Posts">
        <PostsTab userId={userId} />
      </Tabs.Tab>
      <Tabs.Tab name="Stories">
        <StoriesTab userId={userId} />
      </Tabs.Tab>
      <Tabs.Tab name="Doves">
        <DovesTab userId={userId} />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default Profile;
