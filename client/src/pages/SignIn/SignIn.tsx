import React, { type FormEvent, useContext, useState, type Dispatch } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import './SignIn.scss';
import { AuthContext } from 'context/AuthContext';
import { setToken } from 'store/actions/token';
// import { type IState } from 'store/store'; check it
import authenticationFormInputs from 'utils/constants/authentication-form-inputs';
import Input from 'components/Input/Input';

// add google oauth
// https://www.youtube.com/watch?v=Kkht2mwSL_I
// 3:14:24

interface IState {
  username: string
  password: string
  token: string
}
interface IError {
  username: string
  password: string
  general: string
}
type StateValues = keyof IState & keyof IError;
interface ITarget {
  name: string
  value: string
}
// use email instead of username
// create service
const SignIn = ({ setToken }): JSX.Element => {
  const [values, setValues] = useState<IState>({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<IError>({
    username: '',
    password: '',
    general: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { signIn } = useContext(AuthContext);

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
          if (!value.match(authenticationFormInputs.username.pattern)) {
            errorMessage = authenticationFormInputs.username.errorMessage;
          }
          break;
        // case authenticationFormInputs.password.name:
        //   if (!value.match(authenticationFormInputs.password.pattern)) {
        //     errorMessage = authenticationFormInputs.password.errorMessage;
        //   }
        //   break;
        // default:
        //   setErrors((previousValues) => ({ ...previousValues, general: `Unknown input "${name}" with value "${value}"` }));
        //   return `Unknown input "${name}" with value "${value}"`;
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

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!isValidForm()) return;

    try {
      setLoading(true);
      const response = await signIn(values);

      if (response.status >= 200 && response.status < 300) {
        setToken(response.token);
        setValues({ username: '', password: '' });
        setErrors({ username: '', password: '', general: '' });
        setLoading(false);
        navigate('/'); // USE CONSTANT
      } else {
        setErrors((previousValues) => ({ ...previousValues, general: `Sorry, something went wrong. An error has occurred. (Message: ${response.data.message})` }));
      }
    } catch (error) {
      setErrors((previousValues) => ({ ...previousValues, general: `An error has occurred on the server. Please contact us. (Message: ${error.message})` }));
    }
  };

  return (
    <section className='sign-up'>
      <div className="container">
        <h1>Sign in</h1>
        <form className="form sign-up__form" onSubmit={handleSubmit}>
          <div>{errors.general && <p className="form__error-message">{errors.general}</p>}</div>
          {(Object.entries(authenticationFormInputs)).map(([key, value]) => {
            const name = value.name as StateValues;

            if (name === authenticationFormInputs.username.name ||
              name === authenticationFormInputs.password.name) {
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
            }
            return null;
          })}

          <button type="submit" disabled={loading} className={`button ${loading ? 'spin' : 'primary'}`}>
            {loading ? <><span className="spinner"></span>Sending..</> : 'Sign in'}
          </button>

          <span>
            Don't you have an account?
            {' '}
            <Link to='/sign-up'>Create account</Link>
          </span>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = (state: IState): { token: string } => {
  const { token } = state;

  return {
    token
  };
};

const mapDispatchToProps = (dispatch: Dispatch): { setToken: (token: string) => any } => ({
  setToken: (token: string) => dispatch(setToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
