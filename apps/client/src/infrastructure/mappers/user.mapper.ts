import { LoginForm, SignupForm } from '~/shared/types/auth.types';
import { UserLoginDTO, UserSignupDTO } from '~/shared/types/user.types';

class UserMapper {
  toLoginDTO(data: LoginForm): UserLoginDTO {
    return {
      email: data.email,
      password: data.password
    };
  }

  toSignupDTO(data: SignupForm): UserSignupDTO {
    return {
      name: data.name,
      email: data.email,
      password: data.password
    };
  }
}

export default UserMapper;
