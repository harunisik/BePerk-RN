import {Text, SectionList} from 'react-native';
import {SwitchAccountListItem} from './SwitchAccount';
import LogOut from './LogOut';
import {EditProfileListItem} from './EditProfile';
import {ChangePasswordListItem} from './ChangePassword';
import {InviteListItem} from './Invite';
import {CreateNewAccountListItem} from './CreateNewAccount';
import {RequestVerificationListItem} from './ReuqestVerification';
import {DeleteAccountListItem} from './DeleteAccount';
import DarkMode from './DarkMode';
import PushNotifications from './PushNotifications';
import SoundNotifications from './SoundNotifications';
import Likes from './Likes';
import Comments from './Comments';
import Messages from './Messages';
import NewFollowers from './NewFollowers';
import Tag from './Tag';
import NewPosts from './NewPosts';
import {PrivacyPolicyListItem} from './PrivacyPolicy';
import {TermsListItem} from './Terms';
import ItemSeperator from '../../../components/common/ItemSpearator';
import {useCallback} from 'react';
import common from '../../../styles/sharedStyles';

const {gray, p15} = common;

const MENU_LIST = {
  Account: [
    EditProfileListItem,
    ChangePasswordListItem,
    InviteListItem,
    CreateNewAccountListItem,
    RequestVerificationListItem,
    DeleteAccountListItem,
  ],
  Interface: [DarkMode],
  Notifications: [
    PushNotifications,
    SoundNotifications,
    Likes,
    Comments,
    Messages,
    NewFollowers,
    Tag,
    NewPosts,
  ],
  About: [PrivacyPolicyListItem, TermsListItem, SwitchAccountListItem, LogOut],
};

const SECTIONS = Object.entries(MENU_LIST).map(([key, value]) => ({
  title: key,
  data: value.map(item => ({Comp: item})),
}));

const Settings = () => {
  const ItemSeparatorComponent = useCallback(() => <ItemSeperator large />, []);
  const SectionSeparatorComponent = useCallback(
    () => <ItemSeperator large />,
    [],
  );

  return (
    <SectionList
      sections={SECTIONS}
      keyExtractor={(item, index) => {
        return item.Comp.name + index;
      }}
      renderItem={({item: {Comp}}) => <Comp />}
      renderSectionHeader={({section: {title}}) => (
        <Text style={gray}>{title}</Text>
      )}
      ItemSeparatorComponent={ItemSeparatorComponent}
      SectionSeparatorComponent={SectionSeparatorComponent}
      contentContainerStyle={p15}
    />
  );
};

export default Settings;
