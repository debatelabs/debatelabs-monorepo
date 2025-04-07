import {
  LoginForm,
  SignupForm,
  UserLoginDTO,
  UserSignupDTO
} from '~/features/auth/types/auth.types';

const authMapper = {
  toLoginDTO(data: LoginForm): UserLoginDTO {
    return {
      email: data.email,
      password: data.password
    };
  },

  toSignupDTO(data: SignupForm): UserSignupDTO {
    return {
      name: data.name,
      email: data.email,
      password: data.password
    };
  }
};

export default authMapper;
