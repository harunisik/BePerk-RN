import {useStore} from '../../../containers/StoreContainer';
import {AuthActionType} from '../../../containers/AuthAction';
import {SettingsListItem1} from './Settings';

const pageTitle = 'Log out';

export const Logout = () => {
  const {dispatch} = useStore();

  return (
    <SettingsListItem1
      onPress={() => dispatch({type: AuthActionType.SIGN_OUT})}
      title={pageTitle}
    />
  );
};

export default Logout;
