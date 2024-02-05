import {View, Text, Button, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStore} from '../../containers/StoreContainer';
import Settings from './settings/Settings';
import EditProfile from './settings/EditProfile';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Posts from './Posts';
import Doves from './Doves';
import Stories from './Stories';
import {useQuery} from 'react-query';
import {getUserProfile} from '../../services/UserService';
import common from '../../styles/sharedStyles';

export const ProfileOptions = ({navigation}) => {
  const {store} = useStore();
  const {aiCenter, row, dashed, jcSpaceAround} = common;

  return {
    title: store.authResult?.username,
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

const Profile = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();

  const {
    store: {
      authResult: {id},
    },
  } = useStore();

  const {data} = useQuery({
    queryKey: ['getUserProfile', {id}],
    queryFn: getUserProfile,
  });

  const {aiCenter, row, flex1, dashed, jcSpaceAround} = common;

  return (
    <View style={[flex1, dashed]}>
      <View style={[aiCenter, dashed]}>
        <MaterialCommunityIcons
          name="account"
          onPress={() => navigation.navigate(Settings.name)}
          size={56}
        />
        <Text>{data?.fullname}</Text>
      </View>

      <View style={[aiCenter, row, dashed, jcSpaceAround]}>
        <View style={[aiCenter, dashed]}>
          <Text>{data?.posts}</Text>
          <Text>Posts</Text>
        </View>
        <View style={[aiCenter, dashed]}>
          <Text>{data?.followers}</Text>
          <Text>Followers</Text>
        </View>
        <View style={[aiCenter, dashed]}>
          <Text>{data?.following}</Text>
          <Text>Following</Text>
        </View>
      </View>
      <View style={[aiCenter, row, dashed, jcSpaceAround]}>
        <Button
          onPress={() => navigation.navigate(EditProfile.name)}
          title="Edit Profile"
        />
        <Button
          onPress={() => Alert.alert('Under construction!')}
          title="Messages"
        />
      </View>
      <View style={[aiCenter, row, flex1, dashed]}>
        <Tab.Navigator screenOptions={{lazy: true}}>
          <Tab.Screen name={Posts.name} component={Posts} />
          <Tab.Screen name={Stories.name} component={Stories} />
          <Tab.Screen name={Doves.name} component={Doves} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Profile;
