const formInputs = {
  name: {
    label: 'name',
    inputType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'please enter your name',
      value: ''
    },
    validation: {
      required: true
    }
  },
  email: {
    label: 'email',
    inputType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'please enter your email',
      value: ''
    },
    validation: {
      required: true
    }
  },
  street: {
    label: 'street',
    inputType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'please enter street',
      value: ''
    },
    validation: {
      required: true
    }
  },
  landmark: {
    label: 'landmark',
    inputType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'please enter landmark',
      value: ''
    },
    validation: {
      required: true
    }
  },
  city: {
    label: 'city',
    inputType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'please enter city',
      value: ''
    },
    validation: {
      required: true
    }
  },
  country: {
    label: 'country',
    inputType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'please enter country',
      value: ''
    },
    validation: {
      required: true
    }
  },
  zipCode: {
    label: 'zip code',
    inputType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'please enter zip code',
      value: ''
    },
    validation: {
      required: true,
      minLength: 5,
      maxLength: 5
    }
  },
  deliveryMethod: {
    label: 'delivery method',
    inputType: 'select',
    elementConfig: {
      options: [
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'cheapest', displayValue: 'Cheapest' }
      ],
      value: 'fastest'
    },
    validation: {
      required: true
    }
  }
};

export default formInputs;
