import {showMessage} from 'react-native-flash-message';
import {useQueryClient} from 'react-query';
import {useStore} from '../containers/StoreContainer';
import {AuthActionType} from '../containers/AuthAction';
import {signIn} from '../services/AuthService';
import {chatListOpen, getChat} from '../services/ChatService';

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

export function useChatListOpen() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.fetchQuery({
      queryKey: [chatListOpen.name],
      queryFn: chatListOpen,
    });
}

export function useGetChat(data) {
  const queryClient = useQueryClient();

  return () =>
    queryClient.fetchQuery({
      queryKey: [getChat.name],
      queryFn: () => getChat(data),
    });
}
