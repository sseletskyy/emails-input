import { validateEmail } from './utils';

interface EmailNodeAPI {
  create: (email: string) => HTMLDivElement;
  isDeleteButton: (target: HTMLElement) => boolean;
}

const EmailNodeFn = (): EmailNodeAPI => {
  const _validateString = (email: any): void => {
    if (typeof email !== 'string') {
      throw new Error(
        'EmailNode : create method expects a string as an argument'
      );
    }
  };

  /**
   * generates a new html element
   * parent component should be responsible for appending to DOM
   * and adding event listeners
   */
  const create = (email: string): HTMLDivElement => {
    // TODO optimise creation with a template to be cloned
    _validateString(email);
    // remove trailing comma
    const noEndingComma = email.split(',')[0];
    const div = document.createElement('div');
    const t = document.createTextNode(noEndingComma);
    div.appendChild(t);

    // check email and decide which css class to use
    const stateClass = validateEmail(noEndingComma)
      ? 'email--state-valid'
      : 'email--state-invalid';
    div.className = `email ${stateClass}`;
    const span = document.createElement('span');
    span.innerHTML = '&#10005';
    span.className = 'delete';
    div.appendChild(span);
    return div;
  };

  /**
   * helps to check if clicked element is indeed a delete btn (<span> X </span>)
   * is used in the parent component, cause parent is responsible for handling events
   */
  const isDeleteButton = (target: HTMLElement): boolean =>
    target.tagName.toLowerCase() === 'span' &&
    target.classList.contains('delete');

  return {
    create,
    isDeleteButton,
  };
};

export const EmailNode = EmailNodeFn();
