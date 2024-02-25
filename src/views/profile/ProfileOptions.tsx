import {View, Alert, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Settings from './settings/Settings';
import common from '../../styles/sharedStyles';
import {useStore} from '../../containers/StoreContainer';
import {ModalActionType} from '../../containers/ModalAction';
import UserProfileModal from '../../components/profile/UserProfileModal';

const ProfileOptions = ({navigation, route}) => {
  const {dispatch} = useStore();
  const {
    params: {username, isCurrentUser, userId},
  } = route;
  const {aiCenter, row, jcSpaceAround, cGap15, bold, font16} = common;

  return {
    title: '',
    headerBackVisible: true,
    headerLeft: () => <Text style={[bold, font16]}>{username}</Text>,
    headerRight: () => (
      <View>
        {isCurrentUser ? (
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
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={26}
            onPress={() => {
              dispatch({
                type: ModalActionType.OPEN,
                modalInfo: {
                  component: (
                    <UserProfileModal navigation={navigation} userId={userId} />
                  ),
                },
              });
            }}
          />
        )}
      </View>
    ),
  };
};

export default ProfileOptions;
