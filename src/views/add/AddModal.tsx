import {useState} from 'react';
import Button from '../../components/common/buttons/Button';
import PostDove from '../doves/PostDove';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddStack from './AddStack';
import NewStory from './NewStory';
import NewPost from './NewPost';
import {PictureIcon} from '../../components/common/Icons';
import BottomSheetModal from '../../components/common/BottomSheetModal';
import {colors, useColors} from '../../hooks/customHooks';
import View from '../../components/common/View';
import NewMedia from './NewMedia';

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
  const {theme, color} = useColors();
  const navigation = useNavigation();

  const handleDovePress = () => {
    onDismiss();
    setDoveModalVisible(true);
  };

  const handlePostPress = () => {
    onDismiss();
    navigation.navigate(AddStack.name, {
      screen: NewMedia.name,
    });
  };

  return (
    <>
      <BottomSheetModal
        visible={visible}
        onDismiss={onDismiss}
        snapPoints={['19%']}>
        <View style={{rowGap: 10, width: '85%'}} disableTheme>
          <Button
            title="Post / Story"
            onPress={handlePostPress}
            icon={<PictureIcon color={colors.blue} />}
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
    </>
  );
};

export default AddModal;
