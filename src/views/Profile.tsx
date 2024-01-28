import {View, Text} from 'react-native';
import common from '../styles/sharedStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Settings from './Settings';
import {useStore} from '../containers/StoreContainer';

export const ProfileOptions = ({navigation}) => {
  const {store} = useStore();

  return {
    title: store.authResult?.username,
    headerRight: () => (
      <MaterialCommunityIcons
        name="cog"
        onPress={() => navigation.navigate(Settings.name)}
        size={26}
      />
    ),
  };
};

const Profile = () => {
  return (
    <View style={common.centered}>
      <Text>Stories Under construction!</Text>
    </View>
  );
};

export default Profile;
