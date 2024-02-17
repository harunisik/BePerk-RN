export enum FollowersActionType {
  ADD_USER = 'add-user',
  DELETE_USER = 'delete-user',
  CLEAR_LIST = 'clear-list',
}

export interface FollowersAction {
  type: FollowersActionType;
  user?: User;
}

export interface User {
  user_id: string;
}
