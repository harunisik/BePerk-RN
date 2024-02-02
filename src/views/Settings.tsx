import {Text, SafeAreaView, SectionList} from 'react-native';
import {SwitchAccountListItem} from './SwitchAccount';
import LogOut from '../components/LogOut';

const MENU = [
  {
    title: 'Account',
    data: [
      'Edit profile',
      'Change password',
      'Invite',
      'Create a new account',
      'Request verification',
      'Delete account',
    ],
  },
  {title: 'Interface', data: ['Dark mode']},
  {
    title: 'Notifications',
    data: [
      'Enable push-notifications',
      'Sound notifications',
      'Likes',
      'Comments',
      'Messages',
      'New followers',
      'Tag',
      'New posts',
    ],
  },
  {
    title: 'About',
    data: ['Prvacy policy', 'Terms', 'Switch account', 'Log out'],
  },
];

const MENU3 = {
  'About 1': [SwitchAccountListItem, LogOut],
};

const MENU4 = Object.entries(MENU3).map(([key, value]) => ({
  title: key,
  data: value.map(item => ({Comp: item})),
}));

const Settings = ({navigation}) => {
  return (
    <SafeAreaView>
      <SectionList
        sections={MENU4}
        keyExtractor={(item, index) => index}
        renderItem={({item: {Comp}}) => <Comp navigation={navigation} />}
        renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
      />
    </SafeAreaView>
  );
};

export default Settings;
