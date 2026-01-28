export const messages = {
  auth: {
    invalidCredentials: 'Username and password do not match',
    missingUsername: 'Username is required',
    missingPassword: 'Password is required',
    lockedOut: 'Sorry, this user has been locked out',

    notLoggedIn: (route: string) => `You can only access '${route}' when you are logged in.`,
  },
  checkout: {
    firstNameRequired: 'First Name is required',
    lastNameRequired: 'Last Name is required',
    postalCodeRequired: 'Postal Code is required',
  },
} as const;
