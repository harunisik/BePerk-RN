import {Switch} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {postSettings as userPostSettings} from '../../../services/UserService';
import {toBoolean, toNumber} from '../../../utils/BooleanUtil';
import Text from '../../../components/common/Text';
import View from '../../../components/common/View';

const {row, jcSpaceBetween, aiCenter} = common;

const NotificationComments = ({settings}) => {
  const [isEnabled, setIsEnabled] = useState(
    toBoolean(settings?.notification_comments),
  );
  const postSettings = useMutation(userPostSettings);

  const toggleSwitch = () => {
    setIsEnabled(prevState => !prevState);
    postSettings.mutate({
      notification_comments: toNumber(!isEnabled),
    });
  };

  useEffect(() => {
    setIsEnabled(toBoolean(settings?.notification_comments));
  }, [settings]);

  return (
    <View style={[row, jcSpaceBetween, aiCenter]}>
      <Text>Comments</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
};

export default NotificationComments;
