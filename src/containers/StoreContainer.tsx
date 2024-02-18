import {createContext, Dispatch, Fragment, useContext, useReducer} from 'react';
import AuthAction, {AuthActionType, AuthResult} from './AuthAction';
import axios from 'axios';
import {FollowersAction, FollowersActionType, User} from './FollowersAction';
import ModalAction, {ModalActionType, ModalInfo} from './ModalAction';
import ResetAction, {ResetActionType} from './ResetAction';

interface StoreData {
  authResult?: AuthResult;
  selectedUsers?: User[];
  modalInfo?: ModalInfo;
}

const initialState: StoreData = {
  modalInfo: {
    isOpen: false,
    component: Fragment,
  },
};

type StoreAction = ResetAction | AuthAction | FollowersAction | ModalAction;

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
    case FollowersActionType.ADD_USER:
      return {
        ...store,
        selectedUsers: [
          ...(store.selectedUsers ? store.selectedUsers : []),
          action.user,
        ],
      };
    case FollowersActionType.DELETE_USER:
      return {
        ...store,
        selectedUsers: store.selectedUsers?.filter(
          ({user_id}) => user_id !== action.user?.user_id,
        ),
      };
    case FollowersActionType.CLEAR_LIST:
      return {
        ...store,
        selectedUsers: undefined,
      };
    case ModalActionType.OPEN:
      return {
        ...store,
        modalInfo: {isOpen: true, component: action.modalInfo?.component},
      };
    case ModalActionType.CLOSE:
      return {
        ...store,
        modalInfo: {isOpen: false, component: Fragment},
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
