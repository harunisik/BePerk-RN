import {Switch} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useState} from 'react';
import Text from '../../../components/common/Text';
import View from '../../../components/common/View';
import {useStore} from '../../../containers/StoreContainer';
import {AuthActionType} from '../../../containers/AuthAction';

const {row, jcSpaceBetween, aiCenter} = common;

const DarkMode = () => {
  const {
    dispatch,
    store: {
      userInfo: {theme},
    },
  } = useStore();
  const [isEnabled, setIsEnabled] = useState(theme === 'dark');

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    dispatch({
      type: AuthActionType.UPDATE_USER_INFO,
      userInfo: {theme: !isEnabled ? 'dark' : 'light'},
    });
  };

  return (
    <View style={[row, jcSpaceBetween, aiCenter]}>
      <Text>Dark-Mode</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
};

export default DarkMode;
