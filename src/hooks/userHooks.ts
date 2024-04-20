import {showMessage} from 'react-native-flash-message';
import {useQueryClient} from 'react-query';
import {useStore} from '../containers/StoreContainer';
import {AuthActionType} from '../containers/AuthAction';
import {signIn} from '../services/AuthService';

// MUTATION requests

// QUERY requests

export function useSignIn(data) {
  const queryClient = useQueryClient();
  const {dispatch} = useStore();

  return () => {
    queryClient
      .fetchQuery({
        queryKey: ['signin'],
        queryFn: () => signIn(data),
      })
      .then(result => {
        dispatch({type: AuthActionType.SIGN_IN, authResult: result});
      })
      .catch(({message}) => showMessage({message, type: 'danger'}));
  };
}
