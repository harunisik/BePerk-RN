import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Switch,
} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useCustomMutation as useMutation,
  useCustomQuery as useQuery,
} from '../../../hooks/commonHooks';
import {
  getUserProfile,
  postSettings as userPostSettings,
  postProfile as userPostProfile,
} from '../../../services/UserService';
import {useStore} from '../../../containers/StoreContainer';
import {useEffect, useState} from 'react';
import {showMessage} from 'react-native-flash-message';

const {row, flex1, flex3, aiCenter, jcSpaceBetween, p15, gray, mb15, cGap10} =
  common;

const pageTitle = 'Edit profile';

const HeaderRight = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {
      fullname,
      username,
      comment,
      webSite,
      hideFollowers,
      hideFollowersEmoji,
      hideFollowing,
      hideFollowingEmoji,
      privateAccount,
    } = {},
  } = route;

  const postProfile = useMutation(userPostProfile);
  const postSettings = useMutation(userPostSettings);

  const handlePressDone = () => {
    postProfile.mutate(
      {
        fullname,
        username,
        comment,
        webSite,
      },
      {
        onSuccess: () => {
          navigation.goBack();
          showMessage({message: 'Profile updated'});
        },
      },
    );
    postSettings.mutate(
      {
        hideFollowers: hideFollowers ? 1 : 0,
        hideFollowersEmoji,
        hideFollowing: hideFollowing ? 1 : 0,
        hideFollowingEmoji,
        privateAccount: privateAccount ? 1 : 0,
      },
      {
        onSuccess: () => {
          // navigation.goBack();
          // showMessage({message: 'Settings updated'});
        },
      },
    );
  };

  return (
    <Text style={{color: 'dodgerblue'}} onPress={handlePressDone}>
      Done
    </Text>
  );
};

export const EditProfileScreenOptions = () => {
  return {
    title: pageTitle,
    headerShown: true,
    headerRight: HeaderRight,
  };
};

export const EditProfileListItem = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate(EditProfile.name)}>
      <View style={[row, jcSpaceBetween, aiCenter]}>
        <Text>{pageTitle}</Text>
        <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
      </View>
    </Pressable>
  );
};

const EditProfile = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [webSite, setWebSite] = useState('');
  const [hideFollowers, setHideFollowers] = useState(false);
  const [hideFollowersEmoji, setHideFollowersEmoji] = useState('');
  const [hideFollowing, setHideFollowing] = useState(false);
  const [hideFollowingEmoji, setHideFollowingEmoji] = useState('');
  const [privateAccount, setPrivateAccount] = useState(false);

  const {
    store: {
      authResult: {id},
    },
  } = useStore();
  const navigation = useNavigation();

  const {data} = useQuery(getUserProfile, {id});

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
  }, [data]);

  useEffect(() => {
    navigation.setParams({
      fullname,
      username,
      comment,
      webSite,
      hideFollowers,
      hideFollowersEmoji,
      hideFollowing,
      hideFollowingEmoji,
      privateAccount,
    });
  }, [
    fullname,
    username,
    comment,
    webSite,
    hideFollowers,
    hideFollowersEmoji,
    hideFollowing,
    hideFollowingEmoji,
    privateAccount,
  ]);

  return (
    <View style={p15}>
      <View style={[aiCenter, mb15]}>
        <MaterialIcons name="account-circle" size={76} color="lightgray" />
        <Text style={{color: 'dodgerblue'}}>Change profile photo</Text>
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
