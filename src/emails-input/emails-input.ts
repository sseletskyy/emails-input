import { EmailNode } from './email-node';
import { InputNode } from './input-node';

// custom events
export const INPUT_COMPLETED = 'emails-input-completed';
export const EMAIL_DELETED = 'emails-email-deleted';

export interface EmailsInputAPI {
  getEmails: () => string[];
  setEmails: (emails: string[]) => void;
}
export function EmailsInput(containerNode: HTMLElement): EmailsInputAPI {
  let inputNode: HTMLInputElement;
  const _constructor = () => {
    _addInputNode();
    _setEventListeners();
  };

  const _addInputNode = () => {
    inputNode = containerNode.appendChild<HTMLInputElement>(InputNode.create());
  };

  const getEmails = (): string[] => {
    return [];
  };

  const _dispatchInputComplete = (target: HTMLInputElement) => {
    const customEvent = new CustomEvent(INPUT_COMPLETED, {
      bubbles: true,
    });
    return target.dispatchEvent(customEvent);
  };

  // this is a listener of the custom event INPUT_COMPLETED
  const _convertInputToNode: EventListener = (event: CustomEvent) => {
    // console.log('CustomEventListener :: ', event);
    const target = event.target as HTMLInputElement;
    const email = target.value.replace(/,/g, '');
    // early return if email is empty or just comma
    if (!email) {
      // do nothing;
      return;
    }
    // create new email node and add it before input
    const newEmailNode = EmailNode.create(email);
    target.before(newEmailNode);
    // clean un value in input
    target.value = '';
  };

  const _deleteTargetEmail: EventListener = (event: CustomEvent) => {
    const target = event.target as HTMLDivElement;
    target.parentElement.remove();
  };

  const _onKeyUp: EventListener = (event: KeyboardEvent) => {
    // console.log('EventListener :: ', event);
    if (event.defaultPrevented) {
      return;
    }

    // keyCode and comparison with numbers are for backward compatibility with IE
    // noinspection JSDeprecatedSymbols
	  const key = event.key || event.keyCode;
    if (key === 'Enter' || key === 13 || key === ',' || key === 188) {
      _dispatchInputComplete(event.target as HTMLInputElement);
    }
  };

  const _setEventListeners = () => {
    containerNode.addEventListener('keyup', _onKeyUp);
    containerNode.addEventListener(INPUT_COMPLETED, _convertInputToNode);
    containerNode.addEventListener('focusout', _convertInputToNode);
    containerNode.addEventListener(EMAIL_DELETED, _deleteTargetEmail);
  };

  const _validateIncomingEmails = (emails: string[] | any) => {
    if (
      !Array.isArray(emails) ||
      emails.find(email => typeof email !== 'string')
    ) {
      throw new Error(
        'EmailsInput : setEmails method expects an array of strings as an argument'
      );
    }
  };

  const _clearChildren = () => {
    containerNode.innerHTML = '';
  };
  const setEmails = (emails: string[]): void => {
    _validateIncomingEmails(emails);
    _clearChildren();
    emails.forEach(email => {
      const item = EmailNode.create(email);
      containerNode.appendChild<HTMLDivElement>(item);
    });
    containerNode.appendChild<HTMLInputElement>(InputNode.create());
  };

  // call constructor before returning API
  _constructor();
  return {
    getEmails,
    setEmails,
  };
}

// if (window && document) {
//   document.addEventListener('DOMContentLoaded', () => {
//     (function() {
//       var EmailsInput = ClassEmailsInput;
//     })();
//   });
// }

// @ts-ignore
window['EmailsInput'] = EmailsInput;
