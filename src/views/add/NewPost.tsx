import {TextInput, StyleSheet, Switch, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SegmentedButtons} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {uploadPhoto, uploadVideo} from '../../services/UserService';
import {useMutation} from '../../hooks/reactQueryHooks';
import {showMessage} from 'react-native-flash-message';
import {toNumber} from '../../utils/BooleanUtil';
import UserSearch, {NewPostHeaderRight} from '../profile/UserSearch';
import GooglePlaces from './GooglePlaces';
import Video from '../../components/common/Video';
import {createThumbnail} from 'react-native-create-thumbnail';
import Text from '../../components/common/Text';
import View from '../../components/common/View';
import HR from '../../components/common/HR';

const PostButton = ({onPress}) => {
  return (
    <Text onPress={onPress} style={{color: 'dodgerblue'}}>
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
    headerRight: PostButton,
  };
};

const NewPost = () => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [caption, setCaption] = useState('');
  const [showTimer, setShowTimer] = useState(false);
  const [comments, setComments] = useState('public');
  const [likes, setLikes] = useState('public');
  const [views, setViews] = useState('public');
  const [attachedUsers, setAttachedUsers] = useState([]);
  const [location, setLocation] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {assets, selectedUsers, location_address, lat, lon},
  } = route;
  const asset = assets[0];

  const uploadPhotoApi = useMutation(uploadPhoto);
  const uploadVideoApi = useMutation(uploadVideo);

  useEffect(() => {
    if (selectedUsers) {
      setAttachedUsers(selectedUsers);
    }
  }, [selectedUsers]);

  useEffect(() => {
    if (location_address) {
      setLocation({location_address, lat, lon});
    }
  }, [location_address]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <PostButton onPress={handlePressPost} />,
    });
  }, [
    navigation,
    asset,
    caption,
    attachedUsers,
    location,
    showTimer,
    comments,
    likes,
    views,
  ]);

  const handlePressPost = async () => {
    setShowIndicator(true);

    const form = new FormData();
    form.append('height', asset.height);
    form.append('width', asset.width);
    form.append('caption', caption);
    form.append(
      'attached_users',
      attachedUsers?.length > 0
        ? JSON.stringify(
            attachedUsers.map(({user_id}) => {
              return {id: user_id};
            }),
          )
        : '',
    );
    form.append('lat', location ? location.lat : '0');
    form.append('lon', location ? location.lon : '0');
    form.append('location_address', location ? location.location_address : '');
    form.append('expiration_timer', '0');
    form.append('show_timer', toNumber(showTimer));
    form.append('comments', comments === 'public' ? 1 : 0);
    form.append('comments_private', comments === 'private' ? 1 : 0);
    form.append('likes', likes === 'public' ? 1 : 0);
    form.append('likes_private', likes === 'private' ? 1 : 0);
    form.append('views_private', views === 'private' ? 1 : 0);

    form.append(asset.mediaType, {
      name: asset.fileName,
      type: asset.type,
      uri: asset.uri,
    });

    if (asset.mediaType === 'photo') {
      uploadPhotoApi.mutate(form, {
        onSuccess: () => {
          showMessage({message: 'New post sent'});
          navigation.goBack();
        },
        onError: error => {
          showMessage({message: error.message});
          navigation.goBack();
        },
      });
    } else {
      try {
        const response = await createThumbnail({
          url: asset.uri,
        });

        form.append('photo', {
          name: response.path,
          type: response.mime,
          uri: response.path,
        });
      } catch (err) {
        console.error(err);
      }

      uploadVideoApi.mutate(form, {
        onSuccess: () => {
          showMessage({message: 'New post sent'});
          navigation.goBack();
        },
        onError: error => {
          showMessage({message: error.message});
          navigation.goBack();
        },
      });
    }
  };

  const handlePressTagPeople = () => {
    navigation.navigate(UserSearch.name, {
      headerRightComp: NewPostHeaderRight.name,
    });
  };

  return (
    <View style={{padding: 10, rowGap: 15}}>
      {showIndicator && <ActivityIndicator />}
      <View style={{flexDirection: 'row', columnGap: 15, marginBottom: 15}}>
        {asset.mediaType === 'photo' ? (
          <FastImage
            source={{uri: asset.uri}}
            style={{
              width: 100,
              height: 100,
            }}
            resizeMode="stretch"
          />
        ) : (
          <View
            style={{
              width: 100,
              height: 100,
            }}>
            <Video uri={asset.uri} />
          </View>
        )}

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
          alignItems: 'center',
        }}>
        <MaterialIcons name="account-circle" size={30} color="dodgerblue" />
        <Text
          style={{flex: 1}}
          onPress={handlePressTagPeople}
          numberOfLines={1}>
          {attachedUsers?.length > 0
            ? attachedUsers.map(({fullname}) => `@${fullname}`).join(', ')
            : 'Tag people'}
        </Text>
        {attachedUsers?.length > 0 && (
          <MaterialIcons
            name="close"
            size={20}
            color="gray"
            onPress={() => setAttachedUsers([])}
            style={{marginLeft: 'auto'}}
          />
        )}
      </View>
      <HR />
      <View
        style={{
          flexDirection: 'row',
          columnGap: 10,
          alignItems: 'center',
        }}>
        <MaterialIcons name="location-pin" size={30} color="dodgerblue" />
        <Text
          style={{flex: 1}}
          onPress={() => navigation.navigate(GooglePlaces.name)}
          numberOfLines={1}>
          {location ? location.location_address : 'Tag location'}
        </Text>
        {location && (
          <MaterialIcons
            name="close"
            size={20}
            color="gray"
            onPress={() => setLocation(undefined)}
            style={{marginLeft: 'auto'}}
          />
        )}
      </View>
      <HR />
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
        <Text style={{fontWeight: 'bold'}}>Likes</Text>
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
        <Text style={{fontWeight: 'bold'}}>Views</Text>
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
