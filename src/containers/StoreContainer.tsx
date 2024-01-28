import {createContext, Dispatch, useContext, useReducer} from 'react';
import AuthAction, {AuthActionType, AuthResult} from './AuthAction';

interface StoreData {
  authResult?: AuthResult;
}

const initialState: StoreData = {};

enum ResetActionType {
  RESET = 'reset',
}

interface ResetAction {
  type: ResetActionType;
}

type StoreAction = ResetAction | AuthAction;

const updateStore = (store: StoreData, action: StoreAction) => {
  switch (action.type) {
    case ResetActionType.RESET:
      return initialState;
    case AuthActionType.SIGN_IN:
      return {
        ...store,
        authResult: action.authResult,
      };
    case AuthActionType.SIGN_OUT:
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
