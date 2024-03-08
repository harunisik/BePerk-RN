import {createContext, Dispatch, Fragment, useContext, useReducer} from 'react';
import AuthAction, {AuthActionType, AuthResult} from './AuthAction';
import axios from 'axios';
import ModalAction, {ModalActionType, ModalInfo} from './ModalAction';
import ResetAction, {ResetActionType} from './ResetAction';

interface StoreData {
  authResult?: AuthResult;
  modalInfo?: ModalInfo;
}

const initialState: StoreData = {
  modalInfo: {
    isOpen: false,
    component: Fragment,
    routeName: '',
  },
};

type StoreAction = ResetAction | AuthAction | ModalAction;

const updateStore = (store: StoreData, action: StoreAction) => {
  switch (action.type) {
    case ResetActionType.RESET:
      return initialState;
    case AuthActionType.SIGN_IN:
      axios.defaults.headers.common['X-BEPERK-TOKEN'] =
        action.authResult?.token;
      return {
        ...store,
        authResult: action.authResult,
      };
    case AuthActionType.SIGN_OUT:
      delete axios.defaults.headers.common['X-BEPERK-TOKEN'];
      return {
        ...store,
        authResult: undefined,
      };
    case ModalActionType.OPEN:
      return {
        ...store,
        modalInfo: {isOpen: true, ...action.modalInfo},
      };
    case ModalActionType.CLOSE:
      return {
        ...store,
        modalInfo: {isOpen: false, component: Fragment, routeName: ''},
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
