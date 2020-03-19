const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
/**
 * Returns true of email is considered a valid email address
 * @param email String
 * @return boolean
 */
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};
