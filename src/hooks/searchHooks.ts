import {showMessage} from 'react-native-flash-message';
import {useMutation} from 'react-query';
import {searchUsers} from '../services/SearchService';

export function useSearchUsers(onSuccessCallback) {
  return useMutation({
    mutationFn: search => searchUsers(search),
    onSuccess: data => {
      onSuccessCallback(data?.profiles);
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}
