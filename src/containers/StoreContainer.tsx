import {createContext, Dispatch, Fragment, useContext, useReducer} from 'react';
import AuthAction, {AuthActionType, AuthResult} from './AuthAction';
import axios from 'axios';
import ResetAction, {ResetActionType} from './ResetAction';
import * as Keychain from 'react-native-keychain';

interface StoreData {
  authResult?: AuthResult;
}

const initialState: StoreData = {};

type StoreAction = ResetAction | AuthAction;

const updateStore = (store: StoreData, action: StoreAction) => {
  switch (action.type) {
    case ResetActionType.RESET:
      return initialState;
    case AuthActionType.SIGN_IN:
      axios.defaults.headers.common['X-BEPERK-TOKEN'] =
        action.authResult?.token;
      // action.authResult = {
      //   ...action.authResult,
      //   photo:
      //     'https://beperk-app.nyc3.cdn.digitaloceanspaces.com/video/172495/453924eb-d665-44b6-aa34-fa097e31f92b.jpg',
      // };
      Keychain.setGenericPassword(
        'authResult',
        JSON.stringify(action.authResult),
      );
      return {
        ...store,
        authResult: action.authResult,
      };
    case AuthActionType.SIGN_OUT:
      delete axios.defaults.headers.common['X-BEPERK-TOKEN'];
      Keychain.resetGenericPassword();
      return {
        ...store,
        authResult: undefined,
      };
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
