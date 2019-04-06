export const controls = {
  email: {
    label: 'email',
    inputType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Email',
      value: ''
    },
    validation: {
      required: true
    }
  },
  password: {
    label: 'password',
    inputType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password',
      value: ''
    },
    validation: {
      required: true,
      minLength: 6
    }
  }
};
