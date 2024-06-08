import {createContext, Dispatch, Fragment, useContext, useReducer} from 'react';
import AuthAction, {AuthActionType, UserInfo} from './AuthAction';
import axios from 'axios';
import ResetAction, {ResetActionType} from './ResetAction';
import * as Keychain from 'react-native-keychain';

interface StoreData {
  userInfo?: UserInfo;
}

const initialState: StoreData = {};

type StoreAction = ResetAction | AuthAction;

const updateStore = (store: StoreData, action: StoreAction) => {
  switch (action.type) {
    case ResetActionType.RESET:
      return initialState;
    case AuthActionType.SIGN_IN:
      axios.defaults.headers.common['X-BEPERK-TOKEN'] = action.userInfo?.token;
      Keychain.setGenericPassword('userInfo', JSON.stringify(action.userInfo));
      return {...store, userInfo: action.userInfo};
    case AuthActionType.UPDATE_USER_INFO:
      const userInfo = {...store.userInfo, ...action.userInfo};
      Keychain.setGenericPassword('userInfo', JSON.stringify(userInfo));
      return {...store, userInfo};
    case AuthActionType.SIGN_OUT:
      delete axios.defaults.headers.common['X-BEPERK-TOKEN'];
      Keychain.resetGenericPassword();
      return {...store, userInfo: undefined};
    default:
      return store;
  }
};

interface StoreContextValue {
  store: StoreData;
  dispatch: Dispatch<StoreAction>;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const StoreContainer = ({children}: {children: React.ReactNode}) => {
  const [store, dispatch] = useReducer(updateStore, initialState);

  return (
    <StoreContext.Provider
      value={{
        store,
        dispatch,
      }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const value = useContext(StoreContext);
  if (!value) {
    throw new Error('useStore must be used within a StoreContainer');
  }
  return value;
};
