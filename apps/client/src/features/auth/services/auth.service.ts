import { LoginForm, SignupForm } from '~/shared/types/auth.types';
import AuthApi from '../api/auth.api';
import UserMapper from '~/infrastructure/mappers/user.mapper';
import { ServiceMethodProps } from '~/infrastructure/utils/try-catch-decorator';
import ServiceBase from '~/infrastructure/utils/service-base';

export class AuthService extends ServiceBase {
  constructor(
    private readonly api = new AuthApi(),
    private readonly userMapper = new UserMapper()
  ) {
    super();
  }

  public async login(props: ServiceMethodProps<LoginForm>) {
    const userLoginDTO = this.userMapper.toLoginDTO(props.data);
    return await this.api.login(userLoginDTO);
  }

  public async signup(props: ServiceMethodProps<SignupForm>) {
    const userSignupDTO = this.userMapper.toSignupDTO(props.data);
    return await this.api.signup(userSignupDTO);
  }
}

const authService = new AuthService();

export default authService;
