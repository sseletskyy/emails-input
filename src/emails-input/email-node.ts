import { validateEmail } from './utils';
import styles from './styles';

interface CreateFnReturnType {
  div: HTMLDivElement;
  email: string;
}
interface EmailNodeAPI {
  create: (email: string) => CreateFnReturnType;
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
   * returns an object with keys div: HTMLDivElement, email: string
   * email can be used in parent component to update the email list
   */
  const create = (email: string): CreateFnReturnType => {
    // TODO optimise creation with a template to be cloned
    _validateString(email);
    // remove trailing comma
    const noEndingComma = email.split(',')[0];
    const div = document.createElement('div');
    const t = document.createTextNode(noEndingComma);
    div.appendChild(t);

    // check email and decide which css class to use
    const isValid = validateEmail(noEndingComma);
    const stateClass = isValid ? 'emailStateValid' : 'emailStateInvalid';
    div.className = styles[stateClass];
    // set data attributes for re-usage
    div.setAttribute('data-email', noEndingComma);
    div.setAttribute('data-valid', String(isValid));
    const span = document.createElement('span');
    span.innerHTML = '&#10005';
    span.className = styles.delete;
    div.appendChild(span);
    return { div, email: noEndingComma };
  };

  /**
   * helps to check if clicked element is indeed a delete btn (<span> X </span>)
   * is used in the parent component, cause parent is responsible for handling events
   */
  const isDeleteButton = (target: HTMLElement): boolean =>
    target.tagName.toLowerCase() === 'span' &&
    target.classList.contains(styles.delete);

  return {
    create,
    isDeleteButton,
  };
};

export const EmailNode = EmailNodeFn();
