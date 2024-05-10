import UserInfo from '../../components/profile/UserInfo';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useCustomQuery as useQuery,
  useCustomMutation as useMutation,
} from '../../hooks/customHooks';
import {
  deleteFollowing as userDeleteFollowing,
  addFollowing as userAddFollowing,
  getUserProfile,
} from '../../services/UserService';
import {Tabs} from 'react-native-collapsible-tab-view';
import PostsTab from './PostsTab';
import StoriesTab from './StoriesTab';
import DovesTab from './DovesTab';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import common from '../../styles/sharedStyles';
import {TouchableOpacity} from 'react-native';
import EditProfile from './settings/EditProfile';
import Messages from './Messages';

const {aiCenter, row, jcCenter, p10} = common;

const ButtonGroup = ({
  onPressFollowing,
  pressButtonTitle,
  isAuthUser = true,
}) => {
  const navigation = useNavigation();

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
        onPress={() => navigation.navigate(Messages.name)}>
        <Text>Messages</Text>
      </TouchableOpacity>
    </View>
  );
};

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(0);
  const route = useRoute();
  const {
    params: {userId, isAuthUser},
  } = route;

  const {data, refetch, isFetching} = useQuery(getUserProfile, {id: userId});
  const addFollowing = useMutation(userAddFollowing);
  const deleteFollowing = useMutation(userDeleteFollowing);

  const isPrivate =
    !isAuthUser && data?.private === 1 && data?.i_following === 0;

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
          <UserInfo data={data} isAuthUser={isAuthUser} />
          <ButtonGroup
            onPressFollowing={handlePressFollowing}
            pressButtonTitle={isFollowing === 1 ? 'Following' : 'Follow'}
            isAuthUser={isAuthUser}
          />
        </>
      )}>
      {isPrivate && (
        <Tabs.Tab name=" ">
          <Tabs.ScrollView
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }>
            <View style={{margin: 20, alignItems: 'center', rowGap: 10}}>
              <Text style={{fontWeight: 'bold'}}>This account is Private</Text>
              <Text style={{color: 'gray'}}>
                Follow this account to see their photos and videos
              </Text>
            </View>
          </Tabs.ScrollView>
        </Tabs.Tab>
      )}

      {!isPrivate && (
        <Tabs.Tab name="Posts">
          <PostsTab userId={userId} onRefresh={refetch} />
        </Tabs.Tab>
      )}
      {!isPrivate && (
        <Tabs.Tab name="Stories">
          <StoriesTab userId={userId} onRefresh={refetch} />
        </Tabs.Tab>
      )}
      {!isPrivate && (
        <Tabs.Tab name="Doves">
          <DovesTab userId={userId} onRefresh={refetch} />
        </Tabs.Tab>
      )}
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});

export default Profile;
