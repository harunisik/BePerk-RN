import UserInfo from '../../components/profile/UserInfo';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery, useMutation} from '../../hooks/reactQueryHooks';
import {
  deleteFollowing,
  addFollowing,
  getUserProfile,
} from '../../services/UserService';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import PostsTab from './PostsTab';
import StoriesTab from './StoriesTab';
import DovesTab from './DovesTab';
import {Alert, RefreshControl, Share, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import {TouchableOpacity} from 'react-native';
import EditProfile from './settings/EditProfile';
import Messages from './Messages';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Settings from './settings/Settings';
import UserProfileModal from '../../components/profile/UserProfileModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Popup from '../../components/common/Popup';
import MessageDetails from './MessageDetails';
import Text from '../../components/common/Text';
import View from '../../components/common/View';

const {bold, aiCenter, row, jcSpaceAround, cGap15, jcCenter} = common;

const HeaderRight = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {userId, isAuthUser},
  } = route;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'You should join BePerk! It is the best christian social media plaform...',
        url: 'https://itunes.apple.com/app/id1370790950',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View>
      {isAuthUser ? (
        <View style={[aiCenter, row, jcSpaceAround, cGap15]}>
          <MaterialCommunityIcons
            name="share-variant"
            onPress={onShare}
            size={22}
            color="dodgerblue"
          />
          <MaterialCommunityIcons
            name="bookmark"
            onPress={() => Alert.alert('Under construction')}
            size={22}
            color="dodgerblue"
          />
          <MaterialCommunityIcons
            name="cog"
            onPress={() => navigation.navigate(Settings.name)}
            size={22}
            color="dodgerblue"
          />
        </View>
      ) : (
        <>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={26}
            onPress={() => setModalVisible(true)}
          />
          <UserProfileModal
            userId={userId}
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
          />
        </>
      )}
    </View>
  );
};

export const ProfileScreenOptions = ({route, navigation}) => {
  const {
    params: {username, headerBackVisible},
  } = route;

  return {
    title: '',
    headerLeft: () => (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {headerBackVisible && (
          <MaterialIcons
            name="arrow-back-ios"
            color="dodgerblue"
            size={26}
            onPress={() => navigation.goBack()}
          />
        )}
        <Text style={[bold]}>{username}</Text>
      </View>
    ),
    headerRight: HeaderRight,
  };
};

const ButtonGroup = ({
  onPressFollowing,
  pressButtonTitle,
  isAuthUser = true,
  userId,
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
        onPress={() => {
          isAuthUser
            ? navigation.navigate(Messages.name)
            : navigation.navigate(MessageDetails.name, {
                title: '',
                isMultiple: false,
                userId,
              });
        }}>
        <Text>Messages</Text>
      </TouchableOpacity>
    </View>
  );
};

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [following, setFollowing] = useState(0);
  const route = useRoute();
  const {
    params: {userId, isAuthUser},
  } = route;

  const {data, refetch, isFetching} = useQuery(getUserProfile, {id: userId});
  const addFollowingApi = useMutation(addFollowing);
  const deleteFollowingApi = useMutation(deleteFollowing);

  const isPrivate =
    !isAuthUser &&
    data?.private === 1 &&
    (data?.i_following === 0 || data?.i_following === 2);

  const handlePressFollowing = () => {
    if (following === 0) {
      addFollowingApi.mutate({id: userId});
    } else {
      setModalVisible(true);
    }
  };

  const handleDeleteFollowing = () => {
    deleteFollowingApi.mutate(
      {id: userId},
      {onSuccess: () => setModalVisible(false)},
    );
  };

  useEffect(() => {
    setFollowing(data?.i_following);
  }, [data]);

  return (
    <>
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
              // activeColor="white"
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
              pressButtonTitle={
                following === 1
                  ? 'Following'
                  : following === 2
                    ? 'Requested'
                    : 'Follow'
              }
              isAuthUser={isAuthUser}
              userId={userId}
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
                <Text style={{fontWeight: 'bold'}}>
                  This account is Private
                </Text>
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
      <Popup
        visible={modalVisible}
        header={data?.fullname}
        message="Are you sure you want to unfollow?"
        onPressOk={handleDeleteFollowing}
        onPressCancel={() => setModalVisible(false)}
      />
    </>
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
