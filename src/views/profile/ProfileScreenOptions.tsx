import {View, Alert, Text} from 'react-native';
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

  return (
    <View>
      {isAuthUser ? (
        <View style={[aiCenter, row, jcSpaceAround, cGap15]}>
          <MaterialCommunityIcons
            name="share-variant"
            onPress={() => Alert.alert('Under construction')}
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
