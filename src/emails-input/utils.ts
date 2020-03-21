const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
/**
 * Returns true of email is considered a valid email address
 * @param email String
 * @return boolean
 */
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const parsePastedText = (text: string): string[] => {
  const ary = text.split(',');
  return ary.reduce((acc, next) => {
    let email = next.trim();
    let angleBrackets = email.match(/<([^>]*)>/);
    if (angleBrackets && angleBrackets[1]) {
      email = angleBrackets[1].trim();
    }
    if (!!email) {
      acc.push(email);
    }
    return acc;
  }, []);
};

export const isFunction = (fn: any): boolean =>
  fn && fn.constructor && fn.call && fn.apply;
