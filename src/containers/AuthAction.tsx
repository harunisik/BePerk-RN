export interface AuthResult {
  token: string | null;
}

interface AuthAction {
  type: 'SIGN_IN' | 'SIGN_OUT';
  authResult?: AuthResult;
}

export default AuthAction;
