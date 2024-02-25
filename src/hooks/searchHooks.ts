import {showMessage} from 'react-native-flash-message';
import {useMutation} from 'react-query';
import {searchHashTagCount, searchUsers} from '../services/SearchService';
import {useEffect} from 'react';

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

export function useSearchHashTagCount(onSuccessCallback) {
  return useMutation({
    mutationFn: search => searchHashTagCount(search),
    onSuccess: data => {
      onSuccessCallback(data?.hashtags);
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function useSearchText(searchText, search, onSearchTextEmpty) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchText || searchText?.length === 0) {
        onSearchTextEmpty();
      } else {
        search();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);
}
