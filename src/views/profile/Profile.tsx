import UserInfo from '../../components/profile/UserInfo';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery, useMutation} from '../../hooks/customHooks';
import {
  deleteFollowing,
  addFollowing,
  getUserProfile,
} from '../../services/UserService';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
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
    <View style={[aiCenter, row, jcCenter]}>
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
  const addFollowingApi = useMutation(addFollowing);
  const deleteFollowingApi = useMutation(deleteFollowing);

  const isPrivate =
    !isAuthUser && data?.private === 1 && data?.i_following === 0;

  const handlePressFollowing = () => {
    if (isFollowing === 0) {
      addFollowingApi.mutate(
        {id: userId},
        {onSuccess: () => setIsFollowing(1)},
      );
    } else {
      deleteFollowingApi.mutate(
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
      renderTabBar={props => {
        return (
          <MaterialTabBar
            {...props}
            tabStyle={{
              backgroundColor: 'dodgerblue',
              borderRadius: 20,
              height: 30,
              marginHorizontal: 2,
              marginVertical: 5,
            }}
            contentContainerStyle={{paddingHorizontal: 70}}
            activeColor="white"
            indicatorStyle={{display: 'none'}}
            labelStyle={{
              fontWeight: 'bold',
            }}
          />
        );
      }}
      renderHeader={() => (
        <View style={{rowGap: 10}}>
          <UserInfo data={data} isAuthUser={isAuthUser} userId={userId} />
          <ButtonGroup
            onPressFollowing={handlePressFollowing}
            pressButtonTitle={isFollowing === 1 ? 'Following' : 'Follow'}
            isAuthUser={isAuthUser}
          />
        </View>
      )}
      headerContainerStyle={{
        shadowOpacity: 0,
      }}>
      {isPrivate && (
        <Tabs.Tab name="Private Account" label="Private Account">
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
        <Tabs.Tab name="Posts" label="Posts">
          <PostsTab userId={userId} onRefresh={refetch} />
        </Tabs.Tab>
      )}
      {!isPrivate && (
        <Tabs.Tab name="Stories" label="Stories">
          <StoriesTab userId={userId} onRefresh={refetch} />
        </Tabs.Tab>
      )}
      {!isPrivate && (
        <Tabs.Tab name="Doves" label="Doves">
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
