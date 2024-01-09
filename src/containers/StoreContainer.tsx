import {createContext, Dispatch, useContext, useReducer} from 'react';
import AuthAction, {AuthResult} from './AuthAction';

interface StoreData {
  authResult?: AuthResult;
}

const initialState: StoreData = {
  authResult: {
    token: null,
  },
};

interface ResetAction {
  type: 'RESET';
}

type StoreAction = ResetAction | AuthAction;

const updateStore = (store: StoreData, action: StoreAction) => {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'SIGN_IN':
      return {
        ...store,
        authResult: action.authResult,
      };
    case 'SIGN_OUT':
      return {
        ...store,
        authResult: {token: null},
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
