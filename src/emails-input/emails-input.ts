import { EmailNode } from './email-node';
import { InputNode } from './input-node';

// custom events
export const COMPLETE_INPUT = 'emails-input--complete-input-node';
export const DELETE_EMAIL_NODE = 'emails-input--delete-email-node';

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
    const customEvent = new CustomEvent(COMPLETE_INPUT, {
      bubbles: true,
    });
    return target.dispatchEvent(customEvent);
  };

  const _dispatchEmailDeleted = (event: Event) => {
    const targetSpan: HTMLSpanElement = event.target as HTMLSpanElement;
    const customEvent = new CustomEvent(DELETE_EMAIL_NODE, {
      bubbles: true,
    });
    return targetSpan.dispatchEvent(customEvent);
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
    // keyCode and comparison with numbers are for backward compatibility with IE
    // noinspection JSDeprecatedSymbols
    const key = event.key || event.keyCode;
    if (key === 'Enter' || key === 13 || key === ',' || key === 188) {
      _dispatchInputComplete(event.target as HTMLInputElement);
    }
  };

  const _onFocusout: EventListener = (event: Event) => {
    _dispatchInputComplete(event.target as HTMLInputElement);
  };

  const _onClick: EventListener = (event: MouseEvent) => {
    // call custom event only if clicked on cross character in email-node
    const target: HTMLElement = event.target as HTMLElement;
    if (EmailNode.isDeleteButton(target)) {
      _dispatchEmailDeleted(event);
    }
  };

  const _setEventListeners = () => {
    // keyup -> _onKeyUp -> if (comma|Enter) -> _dispatchInputComplete -> _convertInputToNode
    containerNode.addEventListener('keyup', _onKeyUp);

    // focusout -> _onFocusout -> _dispatchInputComplete -> _convertInputToNode
    containerNode.addEventListener('focusout', _onFocusout);

    containerNode.addEventListener(COMPLETE_INPUT, _convertInputToNode);

    // click -> _onClick -> check it is a delete element -> _dispatchEmailDeleted -> _deleteTargetEmail
    containerNode.addEventListener('click', _onClick);
    containerNode.addEventListener(DELETE_EMAIL_NODE, _deleteTargetEmail);
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
