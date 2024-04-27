import {View, Text, Alert, TextInput, StyleSheet, Switch} from 'react-native';
import common from '../../styles/sharedStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
// import FastImage from '../../components/common/FastImage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SegmentedButtons} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {uploadPhoto as userUploadPhoto} from '../../services/UserService';
import {useCustomMutation as useMutation} from '../../hooks/commonHooks';
import {showMessage} from 'react-native-flash-message';
import {toNumber} from '../../utils/BooleanUtil';
import Followers from '../profile/Followers';
import {HeaderRight2} from '../profile/FollowersScreenOptions';

const {flex1, aiCenter, jcCenter} = common;

const HeaderRight = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {
      asset,
      height,
      width,
      caption,
      attached_users,
      lat,
      lon,
      location_address,
      expiration_timer,
      show_timer,
      comments,
      comments_private,
      likes,
      likes_private,
      views_private,
    },
  } = route;

  const uploadPhoto = useMutation(userUploadPhoto);

  const handlePressPost = () => {
    const form = new FormData();
    form.append('height', asset.height);
    form.append('width', asset.width);
    form.append('caption', caption);
    form.append('attached_users', attached_users);
    form.append('lat', '0');
    form.append('lon', lon);
    form.append('location_address', location_address);
    form.append('expiration_timer', expiration_timer);
    form.append('show_timer', show_timer);
    form.append('comments', comments);
    form.append('comments_private', comments_private);
    form.append('likes', likes);
    form.append('likes_private', likes_private);
    form.append('views_private', views_private);

    form.append('photo', {
      name: asset.fileName,
      type: asset.type,
      uri: asset.uri,
    });

    uploadPhoto.mutate(form, {
      onSuccess: () => {
        navigation.goBack();
        showMessage({message: 'New post sent'});
      },
    });
  };

  return (
    <Text style={{color: 'dodgerblue'}} onPress={handlePressPost}>
      Post
    </Text>
  );
};

export const NewPostScreenOptions = ({navigation}) => {
  return {
    title: 'New Post',
    headerLeft: () => (
      <MaterialCommunityIcons
        name="close"
        onPress={() => navigation.goBack()}
        size={26}
      />
    ),
    headerRight: HeaderRight,
  };
};

const NewPost = () => {
  const [caption, setCaption] = useState('');
  const [showTimer, setShowTimer] = useState(false);
  const [comments, setComments] = useState('public');
  const [likes, setLikes] = useState('public');
  const [views, setViews] = useState('public');
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {assets},
  } = route;
  const asset = assets[0];

  useEffect(() => {
    navigation.setParams({
      asset,
      caption,
      attached_users: '',
      location_address: '',
      lat: '0',
      lon: '0',
      expiration_timer: '0',
      show_timer: toNumber(showTimer),
      comments: comments === 'public' ? 1 : 0,
      comments_private: comments === 'private' ? 1 : 0,
      likes: likes === 'public' ? 1 : 0,
      likes_private: likes === 'private' ? 1 : 0,
      views_private: views === 'private' ? 1 : 0,
    });
  }, [
    asset,
    caption,
    // attached_users,
    // location_address,
    // lat,
    // lon,
    // expiration_timer,
    showTimer,
    comments,
    likes,
    views,
  ]);

  const handlePressTagPeople = () => {
    navigation.navigate(Followers.name, {headerRightName: HeaderRight2.name});
  };

  return (
    <View style={{padding: 10, rowGap: 15}}>
      <View style={{flexDirection: 'row', columnGap: 15, marginBottom: 15}}>
        <FastImage
          source={{uri: asset.uri}}
          style={{
            width: 100,
            height: 100,
          }}
          resizeMode="stretch"
        />
        <TextInput
          placeholder="Would you like to leave a caption?"
          value={caption}
          onChangeText={setCaption}
          style={{
            flex: 1,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 10,
          borderBottomColor: 'gray',
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingBottom: 15,
          alignItems: 'center',
        }}>
        <MaterialIcons name="account-circle" size={30} color="dodgerblue" />
        <Text onPress={handlePressTagPeople}>Tag people</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 10,
          borderBottomColor: 'gray',
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingBottom: 15,
          alignItems: 'center',
        }}>
        <MaterialIcons name="location-pin" size={30} color="dodgerblue" />
        <Text>Tag location</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 15,
          justifyContent: 'space-between',
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
          <Ionicons name="timer" size={30} color="dodgerblue" />
          <Text>Timer</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
          <Text>Show timer</Text>
          <Switch value={showTimer} onValueChange={setShowTimer} />
        </View>
      </View>
      <View style={{rowGap: 10}}>
        <Text style={{fontWeight: 'bold'}}>Comments</Text>
        <SegmentedButtons
          value={comments}
          onValueChange={setComments}
          density="small"
          buttons={[
            {
              value: 'public',
              label: 'Public',
              showSelectedCheck: true,
            },
            {
              value: 'private',
              label: 'Private',
              showSelectedCheck: true,
            },
            {
              value: 'disabled',
              label: 'Disabled',
              showSelectedCheck: true,
            },
          ]}
        />
      </View>
      <View style={{rowGap: 10}}>
        <Text style={{fontWeight: 'bold'}}>Comments</Text>
        <SegmentedButtons
          value={likes}
          onValueChange={setLikes}
          density="small"
          buttons={[
            {
              value: 'public',
              label: 'Public',
              showSelectedCheck: true,
            },
            {
              value: 'private',
              label: 'Private',
              showSelectedCheck: true,
            },
            {
              value: 'disabled',
              label: 'Disabled',
              showSelectedCheck: true,
            },
          ]}
        />
      </View>
      <View style={{rowGap: 10}}>
        <Text style={{fontWeight: 'bold'}}>Comments</Text>
        <SegmentedButtons
          value={views}
          onValueChange={setViews}
          density="small"
          buttons={[
            {
              value: 'public',
              label: 'Public',
              showSelectedCheck: true,
            },
            {
              value: 'private',
              label: 'Private',
              showSelectedCheck: true,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default NewPost;
