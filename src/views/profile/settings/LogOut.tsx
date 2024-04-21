import {Text, Pressable} from 'react-native';
import common from '../../../styles/sharedStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useStore} from '../../../containers/StoreContainer';
import {AuthActionType} from '../../../containers/AuthAction';

const {row, aiCenter, jcSpaceBetween} = common;

const pageTitle = 'Log out';

export const Logout = () => {
  const {dispatch} = useStore();

  return (
    <Pressable
      onPress={() => dispatch({type: AuthActionType.SIGN_OUT})}
      style={[row, jcSpaceBetween, aiCenter]}>
      <Text>{pageTitle}</Text>
      <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
    </Pressable>
  );
};

export default Logout;
