import UserInfo from '../../components/profile/UserInfo';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery, useMutation} from '../../hooks/reactQueryHooks';
import {
  deleteFollowing,
  addFollowing,
  getUserProfile,
} from '../../services/UserService';
import {
  MaterialTabBar,
  MaterialTabItem,
  Tabs,
} from 'react-native-collapsible-tab-view';
import PostsTab from './PostsTab';
import StoriesTab from './StoriesTab';
import DovesTab from './DovesTab';
import {Alert, RefreshControl, Share, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import {TouchableOpacity} from 'react-native';
import EditProfile from './settings/EditProfile';
import Messages from './Messages';
import Settings from './settings/Settings';
import UserProfileModal from '../../components/profile/UserProfileModal';
import Popup from '../../components/common/Popup';
import MessageDetails from './MessageDetails';
import Text from '../../components/common/Text';
import View from '../../components/common/View';
import {
  ArrowBackIcon,
  BirdIcon,
  BookmarkIcon,
  CogIcon,
  DotsIcon,
  HomeIcon,
  ShareVariantIcon,
  VideoIcon,
} from '../../components/common/Icons';
import {useColors} from '../../hooks/customHooks';
import Button from '../../components/common/buttons/Button';

const {bold, aiCenter, row, jcSpaceAround, cGap10, cGap15, jcCenter} = common;

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
          <ShareVariantIcon onPress={onShare} />
          <BookmarkIcon
            isOutlined
            onPress={() => Alert.alert('Under construction')}
          />
          <CogIcon onPress={() => navigation.navigate(Settings.name)} />
        </View>
      ) : (
        <>
          <DotsIcon onPress={() => setModalVisible(true)} />
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
          <ArrowBackIcon onPress={() => navigation.goBack()} />
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
    <View style={[aiCenter, row, jcCenter, cGap10]}>
      {isAuthUser ? (
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate(EditProfile.name)}
          style={{paddingHorizontal: 45, paddingVertical: 7}}
        />
      ) : (
        <Button
          title={pressButtonTitle}
          onPress={onPressFollowing}
          style={{paddingHorizontal: 45, paddingVertical: 7}}
        />
      )}
      <Button
        title="Messages"
        onPress={() => {
          isAuthUser
            ? navigation.navigate(Messages.name)
            : navigation.navigate(MessageDetails.name, {
                title: '',
                isMultiple: false,
                userId,
              });
        }}
        style={{paddingHorizontal: 45, paddingVertical: 7}}
      />
    </View>
  );
};

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {color, backgroundColor} = useColors();

  const [following, setFollowing] = useState(0);
  const [tabColors, setTabColors] = useState([color, 'gray', 'gray']);

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
        renderHeader={() => (
          <View style={{rowGap: 20, marginBottom: 15}}>
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
        onIndexChange={index =>
          setTabColors([
            index === 0 ? color : 'gray',
            index === 1 ? color : 'gray',
            index === 2 ? color : 'gray',
          ])
        }
        renderTabBar={props => {
          return (
            <MaterialTabBar
              {...props}
              TabItemComponent={props => {
                return (
                  <MaterialTabItem
                    {...props}
                    label={props => {
                      return (
                        <>
                          {props.index === 0 ? (
                            <HomeIcon color={tabColors[0]} />
                          ) : props.index === 1 ? (
                            <VideoIcon color={tabColors[1]} />
                          ) : (
                            <BirdIcon color={tabColors[2]} />
                          )}
                        </>
                      );
                    }}
                  />
                );
              }}
              indicatorStyle={{backgroundColor: color}}
              labelStyle={{
                color,
                fontWeight: 'bold',
              }}
            />
          );
        }}
        containerStyle={{backgroundColor}}
        headerContainerStyle={{
          backgroundColor,
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
