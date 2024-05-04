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
import NotificationPush from './NotificationPush';
import NotificationSound from './NotificationSound';
import NotificationLikes from './NotificationLikes';
import NotificationComments from './NotificationComments';
import NotificationMessages from './NotificationMessages';
import NotificationNewFollowers from './NotificationNewFollowers';
import NotificationTag from './NotificationTag';
import NotificationNewPosts from './NotificationNewPosts';
import {PrivacyPolicyListItem} from './PrivacyPolicy';
import {TermsListItem} from './Terms';
import ItemSeperator from '../../../components/common/ItemSpearator';
import {useCallback} from 'react';
import common from '../../../styles/sharedStyles';
import {useCustomQuery} from '../../../hooks/customHooks';
import {getUserSettings} from '../../../services/UserService';

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
    NotificationPush,
    NotificationSound,
    NotificationLikes,
    NotificationComments,
    NotificationMessages,
    NotificationNewFollowers,
    NotificationTag,
    NotificationNewPosts,
  ],
  About: [PrivacyPolicyListItem, TermsListItem, SwitchAccountListItem, LogOut],
};

const SECTIONS = Object.entries(MENU_LIST).map(([key, value]) => ({
  title: key,
  data: value.map(item => ({Comp: item})),
}));

const Settings = () => {
  const {data, refetch, isFetching} = useCustomQuery(getUserSettings);

  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator medium />,
    [],
  );
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
      renderItem={({item: {Comp}}) => <Comp settings={data} />}
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
