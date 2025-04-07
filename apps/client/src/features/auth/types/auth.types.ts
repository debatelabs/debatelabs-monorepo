export interface PasswordFormValues {
  password: string;
  confirmPassword?: string;
}

export interface LoginForm extends Omit<PasswordFormValues, 'confirmPassword'> {
  email: string;
}

export interface SignupForm extends Required<PasswordFormValues> {
  name: string;
  email: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserSignupDTO {
  name: string;
  email: string;
  password: string;
}
