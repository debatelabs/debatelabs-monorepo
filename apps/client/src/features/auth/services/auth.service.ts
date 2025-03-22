import { LoginForm, SignupForm } from '~/shared/types/auth.types';
import AuthApi from '../api/auth.api';
import UserMapper from '~/infrastructure/mappers/user.mapper';

export class AuthService {
  constructor(
    private readonly api = new AuthApi(),
    private readonly userMapper = new UserMapper()
  ) {}

  public async login(data: LoginForm) {
    const userLoginDTO = this.userMapper.toLoginDTO(data);
    return await this.api.login(userLoginDTO);
  }

  public async signup(data: SignupForm) {
    const userSignupDTO = this.userMapper.toSignupDTO(data);
    return await this.api.signup(userSignupDTO);
  }
}

const authService = new AuthService();

export default authService;
