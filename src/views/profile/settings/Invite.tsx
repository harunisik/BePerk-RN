import {Alert, Share} from 'react-native';
import {SettingsListItem1} from './Settings';

const InviteListItem = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Download BePerk app it's great.
        `,
        url: 'https://itunes.apple.com/app/id1370790950',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return <SettingsListItem1 onPress={onShare} title="Invite" />;
};

export default InviteListItem;
