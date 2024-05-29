import {View, Switch} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {useMutation} from '../../../hooks/customHooks';
import {postSettings as userPostSettings} from '../../../services/UserService';
import {toBoolean, toNumber} from '../../../utils/BooleanUtil';
import Text from '../../../components/common/Text';

const {row, jcSpaceBetween, aiCenter} = common;

const NotificationMessages = ({settings}) => {
  const [isEnabled, setIsEnabled] = useState(
    toBoolean(settings?.notification_messages),
  );
  const postSettings = useMutation(userPostSettings);

  const toggleSwitch = () => {
    setIsEnabled(prevState => !prevState);
    postSettings.mutate({
      notification_messages: toNumber(!isEnabled),
    });
  };

  useEffect(() => {
    setIsEnabled(toBoolean(settings?.notification_messages));
  }, [settings]);

  return (
    <View style={[row, jcSpaceBetween, aiCenter]}>
      <Text>Messages</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
};

export default NotificationMessages;
