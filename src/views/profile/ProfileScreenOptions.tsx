import {View, Alert, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Settings from './settings/Settings';
import common from '../../styles/sharedStyles';
import {useStore} from '../../containers/StoreContainer';
import {ModalActionType} from '../../containers/ModalAction';
import UserProfileModal from '../../components/profile/UserProfileModal';
import {useNavigation, useRoute} from '@react-navigation/native';

const HeaderRight = () => {
  const {
    store: {
      authResult: {id},
    },
    dispatch,
  } = useStore();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {userId},
  } = route;

  const {aiCenter, row, jcSpaceAround, cGap15} = common;

  return (
    <View>
      {id === userId ? (
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
  );
};

const ProfileScreenOptions = ({route}) => {
  const {
    params: {username},
  } = route;

  const {bold, font16} = common;

  return {
    title: '',
    headerBackVisible: true,
    headerBackTitleVisible: false,
    headerLeft: () => <Text style={[bold, font16]}>{username}</Text>,
    // headerLeft: () => (
    //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //     <MaterialIcons
    //       name="arrow-back-ios"
    //       color="dodgerblue"
    //       size={26}
    //       onPress={() => navigation.goBack()}
    //     />
    //     <Text style={[bold, font16]}>{username}</Text>
    //   </View>
    // ),
    headerRight: HeaderRight,
  };
};

export default ProfileScreenOptions;
