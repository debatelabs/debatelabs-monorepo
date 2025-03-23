import { LoginForm, SignupForm } from '~/shared/types/auth.types';
import AuthApi from '../api/auth.api';
import UserMapper from '~/infrastructure/mappers/user.mapper';
import { ServiceMethodProps, tryCatch } from '~/infrastructure/utils/try-catch-decorator';

export class AuthService {
  constructor(
    private readonly api = new AuthApi(),
    private readonly userMapper = new UserMapper()
  ) {}

  public login = tryCatch(async (props: ServiceMethodProps<LoginForm>) => {
    const userLoginDTO = this.userMapper.toLoginDTO(props.data);
    return await this.api.login(userLoginDTO);
  });

  public signup = tryCatch(async (props: ServiceMethodProps<SignupForm>) => {
    const userSignupDTO = this.userMapper.toSignupDTO(props.data);
    return await this.api.signup(userSignupDTO);
  });
}

const authService = new AuthService();

export default authService;
