import {View, Text, SafeAreaView, SectionList} from 'react-native';

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

const Settings = () => {
  return (
    <SafeAreaView>
      <SectionList
        sections={MENU}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
      />
    </SafeAreaView>
  );
};

export default Settings;
