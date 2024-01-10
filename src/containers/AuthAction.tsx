export enum AuthActionType {
  'SIGN_IN',
  'SIGN_OUT',
}

export interface AuthResult {
  token: string;
}

interface AuthAction {
  type: AuthActionType;
  authResult?: AuthResult;
}

export default AuthAction;
