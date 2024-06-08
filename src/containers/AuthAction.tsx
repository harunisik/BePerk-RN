export enum AuthActionType {
  SIGN_IN = 'signin',
  SIGN_OUT = 'signout',
  UPDATE_USER_INFO = 'updateUserInfo',
}

export interface UserInfo {
  userId: number;
  token: string;
  username: string;
  photo: string;
}

interface AuthAction {
  type: AuthActionType;
  userInfo: Partial<UserInfo>;
}

export default AuthAction;
