export const CHECKOUT_DATA = {
  valid: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '1000',
  },

  missingFirstName: {
    firstName: '',
    lastName: 'Doe',
    postalCode: '1000',
  },

  missingLastName: {
    firstName: 'John',
    lastName: '',
    postalCode: '1000',
  },

  missingPostalCode: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
  },
};
