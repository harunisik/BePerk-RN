import {showMessage} from 'react-native-flash-message';
import {useMutation} from 'react-query';
import {searchHashTagCount, searchUsers} from '../services/SearchService';
import {useEffect} from 'react';

export function useSearchUsers() {
  return useMutation({
    mutationFn: search => searchUsers(search),
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function useSearchHashTagCount() {
  return useMutation({
    mutationFn: search => searchHashTagCount(search),
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
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);
}
