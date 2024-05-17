export enum AuthActionType {
  SIGN_IN = 'signin',
  SIGN_OUT = 'signout',
}

export interface AuthResult {
  id: number;
  token: string;
  username: string;
}

interface AuthAction {
  type: AuthActionType;
  authResult: AuthResult;
}

export default AuthAction;
