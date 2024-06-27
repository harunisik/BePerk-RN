import {useState} from 'react';
import Button from '../../components/common/buttons/Button';
import PostDove from '../doves/PostDove';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddStack from './AddStack';
import NewStory from './NewStory';
import NewPost from './NewPost';
import {
  launchCamera,
  launchImageLibrary,
  launchMediaLibrary,
} from '../../utils/MediaUtil';
import {PictureIcon} from '../../components/common/Icons';
import BottomSheetModal from '../../components/common/BottomSheetModal';
import {colors, useColors} from '../../hooks/customHooks';
import View from '../../components/common/View';
import NewMedia from './NewMedia';

export const ImageVideoSelectionModal = ({visible, onDismiss, navigateTo}) => {
  const navigation = useNavigation();
  const {theme, color} = useColors();

  const processPhoto = () =>
    launchImageLibrary(data => {
      if (data.assets?.length && data.assets.length > 0) {
        navigation.navigate(AddStack.name, {
          screen: navigateTo,
          params: {
            assets: data.assets.map(({type, ...rest}) => {
              return {
                ...rest,
                type,
                mediaType: type.startsWith('image') ? 'photo' : 'video',
              };
            }),
          },
        });
      }
    });

  const processCamera = () =>
    launchCamera(data => {
      if (data.assets?.length && data.assets.length > 0) {
        navigation.navigate(AddStack.name, {
          screen: navigateTo,
          params: {
            assets: data.assets.map(({type, ...rest}) => {
              return {
                ...rest,
                type,
                mediaType: type.startsWith('image') ? 'photo' : 'video',
              };
            }),
          },
        });
      }
    });

  const handlePressImage = () => {
    onDismiss();
    launchMediaLibrary(processPhoto, 'image');
  };

  const handlePressVideo = () => {
    onDismiss();
    launchMediaLibrary(processCamera, 'camera');
  };

  return (
    <BottomSheetModal
      visible={visible}
      onDismiss={onDismiss}
      snapPoints={['20%']}>
      <View style={{rowGap: 10, width: '85%'}} disableTheme>
        <Button
          title="Photo Library"
          onPress={handlePressImage}
          icon={<AntDesign name="picture" size={26} color={colors.blue} />}
          iconColor={colors.blue}
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />

        <Button
          title="Camera"
          onPress={handlePressVideo}
          icon={<AntDesign name="camera" size={26} color={colors.blue} />}
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />
      </View>
    </BottomSheetModal>
  );
};

export const AddDoveModal = ({visible, onDismiss}) => {
  const navigation = useNavigation();
  const {theme, color} = useColors();

  const handlePressDiscussion = () => {
    onDismiss();
    navigation.navigate(AddStack.name, {
      screen: PostDove.name,
      params: {
        subtype: 0,
        buttonText: "Post what's on your mind",
        inputTextPlaceHolder: "What's on your mind?",
        title: 'Post Dove',
      },
    });
  };

  const handlePressTestimony = () => {
    onDismiss();
    navigation.navigate(AddStack.name, {
      screen: PostDove.name,
      params: {
        subtype: 1,
        buttonText: 'Write what God has done for you!',
        inputTextPlaceHolder: 'Share a testimony',
        title: 'Post Testimony',
      },
    });
  };

  const handlePressPrayer = () => {
    onDismiss();
    navigation.navigate(AddStack.name, {
      screen: PostDove.name,
      params: {
        subtype: 2,
        buttonText: 'Share a prayer request!',
        inputTextPlaceHolder: 'Share a prayer request',
        title: 'Post Prayer Request',
      },
    });
  };

  return (
    <BottomSheetModal
      visible={visible}
      onDismiss={onDismiss}
      snapPoints={['27%']}>
      <View style={{rowGap: 10, width: '85%'}} disableTheme>
        <Button
          title="Discussion"
          onPress={handlePressDiscussion}
          icon={<PictureIcon color={colors.blue} />}
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />
        <Button
          title="Testimony"
          onPress={handlePressTestimony}
          icon="account-multiple"
          iconColor={colors.blue}
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />
        <Button
          title="Prayer"
          onPress={handlePressPrayer}
          icon={<MaterialIcons name="work" size={26} color={colors.blue} />}
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />
      </View>
    </BottomSheetModal>
  );
};

const AddModal = ({visible, onDismiss}) => {
  const [doveModalVisible, setDoveModalVisible] = useState(false);
  const [imageVideoModalVisible, setImageVideoModalVisible] = useState(false);
  const [navigateTo, setNavigateTo] = useState('');
  const {theme, color} = useColors();
  const navigation = useNavigation();

  const handleDovePress = () => {
    onDismiss();
    setDoveModalVisible(true);
  };

  const handlePostPress = (navigateTo: string) => {
    onDismiss();
    // setNavigateTo(navigateTo);
    // setImageVideoModalVisible(true);
    navigation.navigate(AddStack.name, {
      screen: NewMedia.name,
    });
  };

  return (
    <>
      <BottomSheetModal
        visible={visible}
        onDismiss={onDismiss}
        snapPoints={['27%']}>
        <View style={{rowGap: 10, width: '85%'}} disableTheme>
          <Button
            title="Post"
            onPress={() => handlePostPress(NewPost.name)}
            icon={<PictureIcon color={colors.blue} />}
            theme={{
              color,
              backgroundColor:
                theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
            }}
          />
          <Button
            title="Story"
            onPress={() => handlePostPress(NewStory.name)}
            icon="account-multiple"
            iconColor={colors.blue}
            theme={{
              color,
              backgroundColor:
                theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
            }}
          />
          <Button
            title="Dove"
            icon="bird"
            iconColor={colors.blue}
            onPress={handleDovePress}
            theme={{
              color,
              backgroundColor:
                theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
            }}
          />
        </View>
      </BottomSheetModal>
      <AddDoveModal
        visible={doveModalVisible}
        onDismiss={() => setDoveModalVisible(false)}
      />
      <ImageVideoSelectionModal
        visible={imageVideoModalVisible}
        onDismiss={() => setImageVideoModalVisible(false)}
        navigateTo={navigateTo}
      />
    </>
  );
};

export default AddModal;
