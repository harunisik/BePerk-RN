import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStore} from '../../containers/StoreContainer';
import Settings from './settings/Settings';
import EditProfile from './settings/EditProfile';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SwitchAccount from './settings/SwitchAccount';
import Posts from './Posts';
import Doves from './Doves';
import Stories from './Stories';

export const ProfileOptions = ({navigation}) => {
  const {store} = useStore();

  return {
    title: store.authResult?.username,
    headerRight: () => (
      <View style={styles.container1}>
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

  return (
    <View style={{flex: 1}}>
      <View style={styles.container3}>
        <MaterialCommunityIcons
          name="account"
          onPress={() => navigation.navigate(Settings.name)}
          size={56}
        />
        <Text>harun local</Text>
      </View>

      <View style={styles.container1}>
        <View style={styles.container2}>
          <Text>9</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.container2}>
          <Text>0</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.container2}>
          <Text>2</Text>
          <Text>Following</Text>
        </View>
      </View>
      <View style={styles.container1}>
        <Button
          onPress={() => navigation.navigate(EditProfile.name)}
          title="Edit Profile"
        />
        <Button
          onPress={() => Alert.alert('Under construction!')}
          title="Messages"
        />
      </View>
      <View style={styles.container4}>
        <Tab.Navigator>
          <Tab.Screen name={Posts.name} component={Posts} />
          <Tab.Screen name={Stories.name} component={Stories} />
          <Tab.Screen name={Doves.name} component={Doves} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  container2: {
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  container3: {
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  container4: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
});

export default Profile;
