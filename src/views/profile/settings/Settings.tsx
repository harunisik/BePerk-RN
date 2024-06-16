import {useCallback, useMemo} from 'react';
import {Pressable, SectionList} from 'react-native';
import {EditProfileListItem} from './EditProfile';
import {ChangePasswordListItem} from './ChangePassword';
import {CreateNewAccountListItem} from '../../auth/CreateNewAccount';
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
import PrivacyPolicyListItem from './PrivacyPolicy';
import TermsListItem from './Terms';
import {SwitchAccountListItem} from './SwitchAccount';
import LogOut from './LogOut';
import ItemSeperator from '../../../components/common/ItemSpearator';
import common from '../../../styles/sharedStyles';
import {useQuery} from '../../../hooks/reactQueryHooks';
import {getUserSettings} from '../../../services/UserService';
import Text from '../../../components/common/Text';
import {ArrowIcon} from '../../../components/common/Icons';
import View from '../../../components/common/View';
import InviteListItem from './Invite';

const {gray, p15, row, jcSpaceBetween, aiCenter} = common;

export const SettingsListItem1 = ({onPress, title}) => {
  return (
    <Pressable style={[row, jcSpaceBetween, aiCenter]} onPress={onPress}>
      <Text>{title}</Text>
      <ArrowIcon />
    </Pressable>
  );
};

const Settings = () => {
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
    About: [
      PrivacyPolicyListItem,
      TermsListItem,
      SwitchAccountListItem,
      LogOut,
    ],
  };

  const {data} = useQuery(getUserSettings);

  const SECTIONS = useMemo(
    () =>
      Object.entries(MENU_LIST).map(([key, value]) => ({
        title: key,
        data: value.map(item => ({Comp: item, key: item.name})),
      })),
    [],
  );

  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator size="medium" />,
    [],
  );
  const SectionSeparatorComponent = useCallback(
    () => <ItemSeperator size="large" />,
    [],
  );

  return (
    <View>
      <SectionList
        sections={SECTIONS}
        renderItem={({item: {Comp}}) => <Comp settings={data} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={gray}>{title}</Text>
        )}
        ItemSeparatorComponent={ItemSeparatorComponent}
        SectionSeparatorComponent={SectionSeparatorComponent}
        contentContainerStyle={[p15]}
      />
    </View>
  );
};

export default Settings;
