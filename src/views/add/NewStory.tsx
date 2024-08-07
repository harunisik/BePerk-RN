import {ActivityIndicator, ImageBackground, SafeAreaView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from '../../hooks/reactQueryHooks';
import {showMessage} from 'react-native-flash-message';
import {postMy24 as userPostMy24} from '../../services/My24Service';
import common from '../../styles/sharedStyles';
import Button from '../../components/common/buttons/Button';
import UserSearch, {NewStoryHeaderRight} from '../profile/UserSearch';
import Video from '../../components/common/Video';
import {createThumbnail} from 'react-native-create-thumbnail';
import {useState} from 'react';
import View from '../../components/common/View';
import {CloseIcon} from '../../components/common/Icons';
import {Asset} from './NewMedia';

const {flex1} = common;

export const NewStoryScreenOptions = ({navigation}) => {
  return {
    title: '',
    headerTransparent: true,
    headerStyle: {backgroundColor: 'transparent'},
    headerLeft: () => (
      <CloseIcon onPress={() => navigation.goBack()} color="white" />
    ),
  };
};

const ButtonGroup = ({onPressPost, onPressMessage}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 10,
      }}
      disableTheme>
      <Button title="Post story" icon="account" onPress={onPressPost} />
      <Button title="Message" icon="share" onPress={onPressMessage} />
    </View>
  );
};

const NewStory = () => {
  const [showIndicator, setShowIndicator] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {asset},
  } = route;

  const postMy24 = useMutation(userPostMy24);

  const getFormData = async () => {
    const form = new FormData();
    form.append('height', asset.height);
    form.append('width', asset.width);
    form.append('attached_users', '[[]]');
    form.append('expiration_timer', 0);
    form.append('duration_timer', 0);
    form.append('show_timer', 0);
    form.append('comments', 1);
    form.append('comments_private', 0);
    form.append('likes', 1);
    form.append('likes_private', 0);
    form.append('type', asset.mediaType === 'image' ? 1 : 0);
    form.append('publish', 1);

    form.append('content', {
      name: asset.fileName,
      type: asset.type,
      uri: asset.uri,
    });

    if (asset.mediaType === 'video') {
      try {
        const response = await createThumbnail({
          url: asset.uri,
        });

        form.append('cover', {
          name: response.path,
          type: response.mime,
          uri: response.path,
        });
      } catch (err) {
        console.error(err);
      }
    }

    return form;
  };

  const handlePressPost = async () => {
    setShowIndicator(true);
    const form = await getFormData();
    form.append('send_users', '');

    postMy24.mutate(form, {
      onSuccess: () => {
        showMessage({message: 'New post sent'});
        navigation.goBack();
      },
      onError: error => {
        showMessage({message: error.message});
        navigation.goBack();
      },
    });
  };

  const handlePressMessage = async () => {
    const form = await getFormData();

    navigation.navigate(UserSearch.name, {
      headerRightComp: NewStoryHeaderRight.name,
      headerRightProps: {formData: form},
    });
  };

  return (
    <>
      {asset.mediaType === 'photo' ? (
        <ImageBackground
          source={{uri: asset.uri}}
          // resizeMode="contain"
          style={[flex1, {alignItems: 'center'}]}>
          <SafeAreaView style={{flexDirection: 'row', marginTop: 'auto'}}>
            {showIndicator && <ActivityIndicator />}
            <ButtonGroup
              onPressPost={handlePressPost}
              onPressMessage={handlePressMessage}
            />
          </SafeAreaView>
        </ImageBackground>
      ) : (
        <SafeAreaView style={flex1}>
          <View
            style={{
              width: '100%',
              height: 200,
              marginTop: '50%',
            }}>
            <Video uri={asset.uri} paused />
          </View>
          <View
            style={{
              marginTop: 'auto',
            }}>
            {showIndicator && <ActivityIndicator />}
            <ButtonGroup
              onPressPost={handlePressPost}
              onPressMessage={handlePressMessage}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default NewStory;
