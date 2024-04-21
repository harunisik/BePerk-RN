import {View, Text, Switch} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {useCustomMutation as useMutation} from '../../../hooks/commonHooks';
import {postSettings as userPostSettings} from '../../../services/UserService';
import {toBoolean, toNumber} from '../../../utils/BooleanUtil';

const {row, jcSpaceBetween, aiCenter} = common;

const NotificationLikes = ({settings}) => {
  const [isEnabled, setIsEnabled] = useState(
    toBoolean(settings?.notification_likes),
  );
  const postSettings = useMutation(userPostSettings);

  const toggleSwitch = () => {
    setIsEnabled(prevState => !prevState);
    postSettings.mutate({
      notification_likes: toNumber(!isEnabled),
    });
  };

  useEffect(() => {
    setIsEnabled(toBoolean(settings?.notification_likes));
  }, [settings]);

  return (
    <View style={[row, jcSpaceBetween, aiCenter]}>
      <Text>Likes</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
};

export default NotificationLikes;
