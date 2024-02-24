import {View, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Settings from './settings/Settings';
import common from '../../styles/sharedStyles';

const ProfileOptions = ({navigation, route}) => {
  const {
    params: {username},
  } = route;
  const {aiCenter, row, dashed, jcSpaceAround} = common;

  return {
    title: username,
    headerRight: () => (
      <View style={[aiCenter, row, dashed, jcSpaceAround]}>
        <MaterialCommunityIcons
          name="share-variant"
          onPress={() => Alert.alert('Under construction')}
          size={26}
        />
        <MaterialCommunityIcons
          name="bookmark"
          onPress={() => Alert.alert('Under construction')}
          size={26}
        />
        <MaterialCommunityIcons
          name="cog"
          onPress={() => navigation.navigate(Settings.name)}
          size={26}
        />
      </View>
    ),
  };
};

export default ProfileOptions;
