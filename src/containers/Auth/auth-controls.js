export const controls = {
  email: {
    label: 'email',
    inputType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'please enter your email',
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
      placeholder: 'please enter password',
      value: ''
    },
    validation: {
      required: true,
      minLength: 6
    }
  }
};
