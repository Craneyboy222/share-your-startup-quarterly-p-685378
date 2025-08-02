/* Form configuration */
export const FORM_CONFIG = {
  validation: {
    usernameMinLength: 3,
    passwordMinLength: 8,
    emailPattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  messages: {
    requiredField: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
    passwordTooShort: 'Password must be at least 8 characters long.'
  }
};