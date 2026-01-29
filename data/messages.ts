export const messages = {
  auth: {
    invalidCredentials: 'Epic sadface: Username and password do not match',
    missingUsername: 'Epic sadface: Username is required',
    missingPassword: 'Epic sadface: Password is required',
    lockedOut: 'Epic sadface: Sorry, this user has been locked out',

    notLoggedIn: (route: string) => `Epic sadface: You can only access '${route}' when you are logged in.`,
  },
  checkout: {
    firstNameRequired: 'First Name is required',
    lastNameRequired: 'Last Name is required',
    postalCodeRequired: 'Postal Code is required',
  },
} as const;
