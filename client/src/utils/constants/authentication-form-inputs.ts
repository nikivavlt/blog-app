const authenticationFormInputs = {
  username: {
    id: 'username',
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    errorMessage: 'Username must be 3-16 characters and shouldn\'t include any special character',
    label: 'Username',
    pattern: '^[A-Za-z0-9]{3,16}$'
  },
  email: {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    errorMessage: 'Please enter a valid email address',
    label: 'Email',
    pattern: '^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
  },
  password: {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    errorMessage: 'Password must be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
    label: 'Password',
    pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$'
  },
  confirmPassword: {
    id: 'confirmPassword',
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm password',
    errorMessage: 'Passwords don\'t match',
    label: 'Confirm password',
    pattern: ''
  }
};

export default authenticationFormInputs;
