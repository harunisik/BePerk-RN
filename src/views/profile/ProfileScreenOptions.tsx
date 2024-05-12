import {View, Alert, Text, Share} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Settings from './settings/Settings';
import common from '../../styles/sharedStyles';
import UserProfileModal from '../../components/profile/UserProfileModal';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';

const {bold, font16, aiCenter, row, jcSpaceAround, cGap15} = common;

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
          <MaterialCommunityIcons
            name="share-variant"
            onPress={onShare}
            size={22}
            color="dodgerblue"
          />
          <MaterialCommunityIcons
            name="bookmark"
            onPress={() => Alert.alert('Under construction')}
            size={22}
            color="dodgerblue"
          />
          <MaterialCommunityIcons
            name="cog"
            onPress={() => navigation.navigate(Settings.name)}
            size={22}
            color="dodgerblue"
          />
        </View>
      ) : (
        <>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={26}
            onPress={() => setModalVisible(true)}
          />
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

const ProfileScreenOptions = ({route, navigation}) => {
  const {
    params: {username, headerBackVisible},
  } = route;

  return {
    title: '',
    headerLeft: () => (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {headerBackVisible && (
          <MaterialIcons
            name="arrow-back-ios"
            color="dodgerblue"
            size={26}
            onPress={() => navigation.goBack()}
          />
        )}
        <Text style={[bold, font16]}>{username}</Text>
      </View>
    ),
    headerRight: HeaderRight,
  };
};

export default ProfileScreenOptions;
