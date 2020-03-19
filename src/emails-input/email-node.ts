interface EmailNodeAPI {
  create: (email: string) => HTMLDivElement;
}

const EmailNodeFn = (): EmailNodeAPI => {
  const _validateString = (email: string | any): void => {
    if (typeof email !== 'string') {
      throw new Error(
        'EmailNode : create method expects a string as an argument'
      );
    }
  };

  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  /**
   * Returns true of email is considered a valid email address
   * @param email
   * @private
   */
  const _validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  };
  const create = (email: string): HTMLDivElement => {
  	// TODO optimise creation with a template to be cloned
    _validateString(email);
    const div = document.createElement('div');
    const t = document.createTextNode(email);
    div.appendChild(t);

    // check email and decide which css class to use
    const stateClass = _validateEmail(email)
      ? 'email--state-valid'
      : 'email--state-invalid';
    div.className = `email ${stateClass}`;
    const span = document.createElement('span');
    span.innerHTML = '&#10005';
    span.className = 'delete';
    div.appendChild(span);
    return div;
  };

  return {
    create,
  };
};

export const EmailNode = EmailNodeFn();
