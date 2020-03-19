import { validateEmail } from './utils';
import { EMAIL_DELETED } from './emails-input';

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

  const _dispatchEmailDeleted = (event: Event) => {
    const targetSpan: HTMLSpanElement = event.target as HTMLSpanElement;
    const customEvent = new CustomEvent(EMAIL_DELETED, {
      bubbles: true,
    });
    return targetSpan.dispatchEvent(customEvent);
  };

  const _setEventListeners = (node: HTMLElement) => {
    node.addEventListener('click', _dispatchEmailDeleted);
  };
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
    _setEventListeners(span);
    div.appendChild(span);
    return div;
  };

  return {
    create,
  };
};

export const EmailNode = EmailNodeFn();
