import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './SignUp.scss';
import UserService from 'services/users';
import Input from 'components/Input/Input';
import authenticationFormInputs from 'utils/constants/authentication-form-inputs';

interface IState {
  username: string
  email: string
  password: string
  confirmPassword: string
}
interface IError {
  username: string
  email: string
  password: string
  confirmPassword: string
  general: string
}
type StateValues = keyof IState & keyof IError;
interface ITarget {
  name: string
  value: string
}

// add google oauth
// https://www.youtube.com/watch?v=Kkht2mwSL_I
// 3:14:24

const SignUp = (): JSX.Element => {
  const [values, setValues] = useState<IState>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<IError>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setValues((previousValues) => ({ ...previousValues, [name]: value }));
  };

  const validateValue = ({ name, value }: ITarget): string => {
    let errorMessage = '';

    if (value === '') {
      errorMessage = 'Please fill out this field';
    } else {
      switch (name) {
        case authenticationFormInputs.username.name:
          if (value.match(authenticationFormInputs.username.pattern) == null) {
            errorMessage = authenticationFormInputs.username.errorMessage;
          }
          break;
        case authenticationFormInputs.email.name:
          if (value.match(authenticationFormInputs.email.pattern) == null) {
            errorMessage = authenticationFormInputs.email.errorMessage;
          }
          break;
        case authenticationFormInputs.password.name:
          if (value.match(authenticationFormInputs.password.pattern) == null) {
            errorMessage = authenticationFormInputs.password.errorMessage;
          }
          break;
        case authenticationFormInputs.confirmPassword.name:
          if (value !== values.password) {
            errorMessage = authenticationFormInputs.confirmPassword.errorMessage;
          }
          break;
        default:
          setErrors((previousValues) => ({ ...previousValues, general: `Unknown input "${name}" with value "${value}"` }));
          return `Unknown input "${name}" with value "${value}"`;
      }
    }

    setErrors((previousErrors) => ({ ...previousErrors, [name]: errorMessage }));
    return errorMessage;
  };

  const isValidForm = (): boolean => {
    const errorMessages = Object.entries(values)
      .map(([key, value]) => validateValue({ name: key, value }))
      .filter((error) => error !== '');

    return (errorMessages.length === 0);
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (!isValidForm()) return;

    try {
      setLoading(true);
      const response = await UserService.signUp(values);

      if (response.status >= 200 && response.status < 300) {
        setValues({ username: '', email: '', password: '', confirmPassword: '' });
        setErrors({ username: '', email: '', password: '', confirmPassword: '', general: '' });
        setLoading(false);
        navigate('/sign-in'); // USE CONSTANT
      } else {
        setErrors((previousValues) => ({ ...previousValues, general: `Sorry, something went wrong. An error has occurred. (Message: ${response.message})` }));
      }
    } catch (error: any) {
      setErrors((previousValues) => ({ ...previousValues, general: `An error has occurred on the server. Please contact us. (Message: ${error.message})` }));
    }
  };

  return (
    <section className="sign-up">
      <div className="container">
        <h1>Sign up</h1>
        <form className="form sign-up__form" onSubmit={(event) => handleSubmit(event)}>
          <div>{errors.general && <p className="form__error-message">{errors.general}</p>}</div>
          {(Object.entries(authenticationFormInputs)).map(([key, value]) => {
            const name = value.name as StateValues;
            return (
              <Input
                key={key}
                value={values[name]}
                onChange={handleChange}
                error={errors[name]}
                {...value}
                validateValue={validateValue}
              />
            );
          })}
          <button type="submit" disabled={loading} className={`button ${loading ? 'spin' : 'primary'}`}>
            {loading ? <><span className="spinner"></span>Sending..</> : 'Sign up'}
          </button>
          <span>
            Do you have an account? <Link to='/sign-in'>Sign in</Link>
          </span>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
