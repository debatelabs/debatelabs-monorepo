export enum ResponseErrorEnum {
  LOGIN_UNAUTHORIZED = 'Username or password is wrong',
  TOKEN_UNAUTHORIZED = 'User not authorized or session expired',
  REGISTER_USER_EXIST = 'User with such email already exists',
  USER_BLOCKED = 'User blocked',
  USER_NOT_FOUND = 'User not found',
  FRIENDSHIP_NOT_FOUND = 'Friendship request not found',
}

export enum ResponseSuccessEnum {}
