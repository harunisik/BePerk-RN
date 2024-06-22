import {Switch, ActivityIndicator, ScrollView} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '../../../hooks/reactQueryHooks';
import {
  getUserProfile,
  postProfile,
  postSettings,
} from '../../../services/UserService';
import {useStore} from '../../../containers/StoreContainer';
import {useEffect, useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import Button from '../../../components/common/buttons/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  launchCamera,
  launchImageLibrary,
  launchMediaLibrary,
} from '../../../utils/MediaUtil';
import AccountCard from '../../../components/common/AccountCard';
import Text from '../../../components/common/Text';
import View from '../../../components/common/View';
import HR from '../../../components/common/HR';
import {SettingsListItem1} from './Settings';
import TextInput from '../../../components/common/TextInput';
import {AuthActionType} from '../../../containers/AuthAction';
import {colors, useColors} from '../../../hooks/customHooks';
import BottomSheetModal from '../../../components/common/BottomSheetModal';

const {row, flex1, flex3, aiCenter, jcSpaceBetween, p15, gray, mb15, cGap10} =
  common;

const pageTitle = 'Edit profile';

const DoneButton = ({onPress}) => {
  return (
    <Text onPress={onPress} style={{color: '#0AAEEF'}}>
      Post
    </Text>
  );
};

export const EditProfileScreenOptions = () => {
  return {
    title: pageTitle,
    headerShown: true,
    headerRight: DoneButton,
  };
};

export const EditProfileListItem = () => {
  const navigation = useNavigation();

  return (
    <SettingsListItem1
      onPress={() => navigation.navigate(EditProfile.name)}
      title={pageTitle}
    />
  );
};

const EditProfile = () => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [webSite, setWebSite] = useState('');
  const [hideFollowers, setHideFollowers] = useState(false);
  const [hideFollowersEmoji, setHideFollowersEmoji] = useState('');
  const [hideFollowing, setHideFollowing] = useState(false);
  const [hideFollowingEmoji, setHideFollowingEmoji] = useState('');
  const [privateAccount, setPrivateAccount] = useState(false);
  const [asset, setAsset] = useState();
  const [photo, setPhoto] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    dispatch,
    store: {
      userInfo: {userId},
    },
  } = useStore();
  const navigation = useNavigation();
  const {theme, color, backgroundColor} = useColors();

  const {data} = useQuery(getUserProfile, {id: userId});
  const postProfileApi = useMutation(postProfile);
  const postSettingsApi = useMutation(postSettings);

  const handlePressDone = () => {
    setShowIndicator(true);

    const form = new FormData();
    form.append('fullname', fullname);
    form.append('username', username);
    form.append('comment', comment.replaceAll(/[\n]+/g, '\n'));
    form.append('webSite', webSite);

    if (asset) {
      form.append('photo', {
        name: asset.fileName,
        type: asset.type,
        uri: asset.uri,
      });
    }

    postProfileApi.mutate(form, {
      onSuccess: data => {
        dispatch({
          type: AuthActionType.UPDATE_USER_INFO,
          userInfo: {username, photo: data.photo},
        });
        showMessage({message: 'Profile updated'});
        navigation.goBack();
      },
    });

    postSettingsApi.mutate(
      {
        hideFollowers: hideFollowers ? 1 : 0,
        hideFollowersEmoji,
        hideFollowing: hideFollowing ? 1 : 0,
        hideFollowingEmoji,
        privateAccount: privateAccount ? 1 : 0,
      },
      {
        onSuccess: () => {
          // TODO: ?
          // navigation.goBack();
          // showMessage({message: 'Settings updated'});
        },
      },
    );
  };

  const processPhoto = () =>
    launchImageLibrary(data => {
      if (data.assets?.length && data.assets.length > 0) {
        const asset = data.assets[0];
        setAsset(asset);
        setPhoto(asset.uri);
      }
    });

  const processCamera = () =>
    launchCamera(data => {
      if (data.assets?.length && data.assets.length > 0) {
        const asset = data.assets[0];
        setAsset(asset);
        setPhoto(asset.uri);
      }
    });

  const handlePressPhoto = () => {
    setModalVisible(false);
    launchMediaLibrary(processPhoto, 'image');
  };

  const handlePressCamera = () => {
    setModalVisible(false);
    launchMediaLibrary(processCamera, 'camera');
  };

  useEffect(() => {
    setFullname(data?.fullname);
    setUsername(data?.username);
    setComment(data?.comment);
    setWebSite(data?.webSite);
    setHideFollowers(new Boolean(data?.hide_followers).valueOf());
    setHideFollowersEmoji(data?.hide_followers_emoji);
    setHideFollowing(new Boolean(data?.hide_following).valueOf());
    setHideFollowingEmoji(data?.hide_following_emoji);
    setPrivateAccount(new Boolean(data?.private).valueOf());
    setHideFollowingEmoji(data?.hide_following_emoji);
    setPhoto(data?.photo);
  }, [data]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <DoneButton onPress={handlePressDone} />,
    });
  }, [
    navigation,
    fullname,
    username,
    comment,
    webSite,
    hideFollowers,
    hideFollowersEmoji,
    hideFollowing,
    hideFollowingEmoji,
    privateAccount,
    asset,
  ]);

  return (
    <>
      <ScrollView style={{backgroundColor}}>
        <View style={[p15, {flex: 1, rowGap: 8}]}>
          {showIndicator && <ActivityIndicator />}
          <View style={[aiCenter, {rowGap: 10, marginBottom: 10}]}>
            <AccountCard photo={photo} displayUsername={false} size={50} />
            <Text
              style={{color: '#0AAEEF'}}
              onPress={() => setModalVisible(true)}>
              Change profile photo
            </Text>
          </View>
          <View style={[row, aiCenter]}>
            <Text style={[gray, flex1]}>Name</Text>
            <TextInput
              placeholder="Tap to enter name"
              onChangeText={setFullname}
              value={fullname}
              style={[flex3]}
            />
          </View>
          <HR />
          <View style={[row, aiCenter]}>
            <Text style={[gray, flex1]}>Username</Text>
            <TextInput
              placeholder="Tap to enter username"
              onChangeText={setUsername}
              value={username}
              style={[flex3]}
            />
          </View>
          <HR />
          <View style={[row, aiCenter]}>
            <Text style={[gray, flex1]}>Bio</Text>
            <TextInput
              placeholder="Tap to enter bio"
              onChangeText={setComment}
              value={comment}
              style={[flex3, {maxHeight: 100}]}
              multiline
            />
          </View>
          <HR />
          <View style={[row, aiCenter]}>
            <Text style={[gray, flex1]}>Website</Text>
            <TextInput
              placeholder="Tap to enter website"
              onChangeText={setWebSite}
              value={webSite}
              style={[flex3]}
            />
          </View>
          <HR style={[{marginBottom: 30}]} />
          <View style={[row, jcSpaceBetween, aiCenter, mb15]}>
            <Text>Hide followers</Text>
            <View style={[row, aiCenter, cGap10]}>
              <Text>{data?.hide_followers_emoji}</Text>
              <Switch onValueChange={setHideFollowers} value={hideFollowers} />
            </View>
          </View>
          <View style={[row, jcSpaceBetween, aiCenter, mb15]}>
            <Text>Hide followings</Text>
            <View style={[row, aiCenter, cGap10]}>
              <Text>{data?.hide_following_emoji}</Text>
              <Switch onValueChange={setHideFollowing} value={hideFollowing} />
            </View>
          </View>
          <View style={[row, jcSpaceBetween, aiCenter, mb15]}>
            <Text>Private account</Text>
            <Switch onValueChange={setPrivateAccount} value={privateAccount} />
          </View>
        </View>
      </ScrollView>
      <BottomSheetModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        snapPoints={['20%']}>
        <View style={{rowGap: 10, width: '85%'}} disableTheme>
          <Button
            title="Photo Library"
            onPress={handlePressPhoto}
            icon={<AntDesign name="picture" size={26} color={colors.blue} />}
            theme={{
              color,
              backgroundColor:
                theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
            }}
          />
          <Button
            title="Camera"
            onPress={handlePressCamera}
            icon={<AntDesign name="camera" size={26} color={colors.blue} />}
            theme={{
              color,
              backgroundColor:
                theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
            }}
          />
        </View>
      </BottomSheetModal>
    </>
  );
};

export default EditProfile;
