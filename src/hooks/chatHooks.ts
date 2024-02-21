import {showMessage} from 'react-native-flash-message';
import {useMutation} from 'react-query';
import {chatShare} from '../services/ChatService';

export function useChatShare(onSuccessCallback) {
  return useMutation({
    mutationFn: share => chatShare(share),
    onSuccess: () => {
      showMessage({message: 'Message sent'});
      onSuccessCallback();
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}
