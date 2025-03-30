import { LoginForm, SignupForm } from '~/core/types/auth.types';
import { UserLoginDTO, UserSignupDTO } from '~/core/types/user.types';

const userMapper = {
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

export default userMapper;
