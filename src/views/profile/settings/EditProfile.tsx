import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Switch,
  ActivityIndicator,
} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useMutation, useQuery} from '../../../hooks/customHooks';
import {
  getUserProfile,
  postProfile,
  postSettings,
} from '../../../services/UserService';
import {useStore} from '../../../containers/StoreContainer';
import {useEffect, useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import BottomModal from '../../../components/common/BottomModal';
import Button from '../../../components/common/buttons/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchMediaLibrary} from '../../../utils/MediaUtil';
import {PERMISSIONS} from 'react-native-permissions';
import FastImage from 'react-native-fast-image';

const {row, flex1, flex3, aiCenter, jcSpaceBetween, p15, gray, mb15, cGap10} =
  common;

const pageTitle = 'Edit profile';

const DoneButton = ({onPress}) => {
  return (
    <Text onPress={onPress} style={{color: 'dodgerblue'}}>
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
    <Pressable
      onPress={() => navigation.navigate(EditProfile.name)}
      style={[row, jcSpaceBetween, aiCenter]}>
      <Text>{pageTitle}</Text>
      <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
    </Pressable>
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
    store: {
      authResult: {id},
    },
  } = useStore();
  const navigation = useNavigation();

  const {data} = useQuery(getUserProfile, {id});
  const postProfileApi = useMutation(postProfile);
  const postSettingsApi = useMutation(postSettings);

  const handlePressDone = () => {
    setShowIndicator(true);

    const form = new FormData();
    form.append('fullname', fullname);
    form.append('username', username);
    form.append('comment', comment);
    form.append('website', webSite);

    if (asset) {
      form.append('photo', {
        name: asset.fileName,
        type: asset.type,
        uri: asset.uri,
      });
    }

    postProfileApi.mutate(form, {
      onSuccess: () => {
        navigation.goBack();
        showMessage({message: 'Profile updated'});
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

  const handlePressMedia = permission => {
    launchMediaLibrary(permission, data => {
      setModalVisible(false);
      if (data.assets?.length && data.assets.length > 0) {
        const asset = data.assets[0];
        setAsset(asset);
        setPhoto(asset.uri);
      }
    });
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
      <View style={p15}>
        {showIndicator && <ActivityIndicator />}
        <View style={[aiCenter, mb15]}>
          {photo ? (
            <FastImage
              source={{uri: photo}}
              style={{width: 100, height: 100}}
            />
          ) : (
            <MaterialIcons name="account-circle" size={76} color="lightgray" />
          )}
          <Text
            style={{color: 'dodgerblue'}}
            onPress={() => setModalVisible(true)}>
            Change profile photo
          </Text>
        </View>
        <View style={[row, aiCenter, styles.line]}>
          <Text style={[gray, flex1]}>Name</Text>
          <TextInput
            placeholder="Tap to enter name"
            onChangeText={setFullname}
            value={fullname}
            style={[styles.textInput, flex3]}
          />
        </View>
        <View style={[row, aiCenter, styles.line]}>
          <Text style={[gray, flex1]}>Username</Text>
          <TextInput
            placeholder="Tap to enter username"
            onChangeText={setUsername}
            value={username}
            style={[styles.textInput, flex3]}
          />
        </View>
        <View style={[row, aiCenter, styles.line]}>
          <Text style={[gray, flex1]}>Bio</Text>
          <TextInput
            placeholder="Tap to enter bio"
            onChangeText={setComment}
            value={comment}
            style={[flex3, styles.textInput]}
            multiline
          />
        </View>
        <View style={[row, aiCenter, styles.line, {marginBottom: 40}]}>
          <Text style={[gray, flex1]}>Website</Text>
          <TextInput
            placeholder="Tap to enter website"
            onChangeText={setWebSite}
            value={webSite}
            style={[styles.textInput, flex3]}
          />
        </View>
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
      <BottomModal visible={modalVisible}>
        <Button
          title="Photo Library"
          onPress={() => handlePressMedia(PERMISSIONS.IOS.PHOTO_LIBRARY)}
          iconComponent={
            <AntDesign name="picture" size={26} color="dodgerblue" />
          }
        />

        <Button
          title="Camera"
          onPress={() => handlePressMedia(PERMISSIONS.IOS.CAMERA)}
          iconComponent={
            <AntDesign name="camera" size={26} color="dodgerblue" />
          }
        />
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
    padding: 10,
    minHeight: 40,
    maxHeight: 100,
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
});

export default EditProfile;
