import {createContext, Dispatch, useContext, useReducer} from 'react';
import AuthAction, {AuthActionType, AuthResult} from './AuthAction';
import axios from 'axios';
import {FollowersAction, FollowersActionType, User} from './FollowersAction';
import ModalAction, {ModalActionType, ModalInfo} from './ModalAction';

interface StoreData {
  authResult?: AuthResult;
  selectedUsers?: User[];
  // modalInfo?: ModalInfo;
  isModalOpen?: boolean;
}

const initialState: StoreData = {
  isModalOpen: false,
};

enum ResetActionType {
  RESET = 'reset',
}

interface ResetAction {
  type: ResetActionType;
}

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
          ({user_id}) => user_id !== action.user.user_id,
        ),
      };
    case FollowersActionType.CLEAR_LIST:
      return {
        ...store,
        selectedUsers: undefined,
      };
    case ModalActionType.SET_MODAL:
      return {
        ...store,
        isModalOpen: action.isModalOpen,
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
