import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Switch,
} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useCustomQuery as useQuery} from '../../../hooks/commonHooks';
import {getUserProfile} from '../../../services/UserService';
import {useStore} from '../../../containers/StoreContainer';
import {useEffect, useState} from 'react';

const {row, flex1, flex3, aiCenter, jcSpaceBetween, p15, gray, mb15, cGap10} =
  common;

export const EditProfileListItem = () => {
  const navigation = useNavigation();
  const title = 'Edit profile';

  return (
    <Pressable onPress={() => navigation.navigate(EditProfile.name)}>
      <View style={[row, jcSpaceBetween, aiCenter]}>
        <Text>{title}</Text>
        <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
      </View>
    </Pressable>
  );
};

const EditProfile = () => {
  const {
    store: {
      authResult: {id},
    },
  } = useStore();

  const {data} = useQuery(getUserProfile, {id});

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [website, setWebsite] = useState('');
  const [hideFollowers, setHideFollowers] = useState(false);
  const [hideFollowings, setHideFollowings] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(false);

  useEffect(() => {
    setFullname(data?.fullname);
    setUsername(data?.username);
    setComment(data?.comment);
    setWebsite(data?.website);
    setHideFollowers(new Boolean(data?.hide_followers).valueOf());
    setHideFollowings(new Boolean(data?.hide_following).valueOf());
    setPrivateAccount(new Boolean(data?.private).valueOf());
  }, [data]);

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
          onChangeText={setWebsite}
          value={website}
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
          <Switch onValueChange={setHideFollowings} value={hideFollowings} />
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
