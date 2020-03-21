import polyfills from './polyfills';
import { EmailNode } from './email-node';
import { InputNode } from './input-node';
import { parsePastedText, validateEmail } from './utils';

polyfills(); // support IE11
// custom events
export const COMPLETE_INPUT = 'emails-input--complete-input-node';
export const DELETE_EMAIL_NODE = 'emails-input--delete-email-node';

export interface EmailsInputAPI {
  getEmails: () => string[];
  setEmails: (emails: string[]) => void;
  // extra method
  isEmailValid: (email: string) => boolean;
}
export function EmailsInput(containerNode: HTMLElement): EmailsInputAPI {
  let emailList: string[];
  const _constructor = () => {
    emailList = [];
    _addInputNode();
    _setEventListeners();
  };

  const _addInputNode = () => {
    containerNode.appendChild<HTMLInputElement>(InputNode.create());
  };

  const getEmails = (): string[] => {
    // return a cloned array, no way to impact on the list outside
    return Array.apply({}, emailList);
  };

  const _dispatchCompleteInput = (target: HTMLInputElement) => {
    const customEvent = new CustomEvent(COMPLETE_INPUT, {
      bubbles: true,
    });
    return target.dispatchEvent(customEvent);
  };

  const _dispatchDeleteEmailNode = (event: Event) => {
    const targetSpan: HTMLSpanElement = event.target as HTMLSpanElement;
    const customEvent = new CustomEvent(DELETE_EMAIL_NODE, {
      bubbles: true,
    });
    return targetSpan.dispatchEvent(customEvent);
  };

  // this is a listener of the custom event COMPLETE_INPUT
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
    const { div: newEmailNode } = EmailNode.create(email);
    target.parentNode.insertBefore(newEmailNode, target);
    // add email to local list
    emailList.push(email);
    // clean un value in input
    target.value = '';
  };

  const _deleteTargetEmail: EventListener = (event: CustomEvent) => {
    const target = event.target as HTMLDivElement;
    const { parentElement: emailNode } = target;
    // remove email from emailList
    const email = emailNode.getAttribute('data-email');
    const emailIndex = emailList.indexOf(email);
    if (emailIndex >= 0) {
      emailList.splice(emailIndex, 1);
    }
    // remove email node
    target.parentElement.remove();
  };

  const _onKeyUp: EventListener = (event: KeyboardEvent) => {
    // keyCode and comparison with numbers are for backward compatibility with IE
    // noinspection JSDeprecatedSymbols
    const key = event.key || event.keyCode;
    if (key === 'Enter' || key === 13 || key === ',' || key === 188) {
      _dispatchCompleteInput(event.target as HTMLInputElement);
    }
  };

  const _onFocusout: EventListener = (event: Event) => {
    _dispatchCompleteInput(event.target as HTMLInputElement);
  };

  const _onClick: EventListener = (event: MouseEvent) => {
    // call custom event only if clicked on cross character in email-node
    const target: HTMLElement = event.target as HTMLElement;
    if (EmailNode.isDeleteButton(target)) {
      _dispatchDeleteEmailNode(event);
    }
  };

  // this method is not covered with tests cause js-dom does not support ClipboardEvent
  // so the logic of parsing is moved to utils :: parsePastedText and covered with unit tests
  const _onPaste: EventListener = (event: ClipboardEvent) => {
    event.preventDefault();

    // @ts-ignore
    const text = (event.clipboardData || window.clipboardData).getData('text');
    const parsed = parsePastedText(text);
    const input = containerNode.lastChild as HTMLInputElement;
    // if only one email in clipboard then put the value in input
    if (parsed.length < 2) {
      parsed[0] && (input.value = parsed[0]);
      return;
    }
    // otherwise add them all immediately
    // add new emails without re-rendering existing ones
    parsed.forEach(item => {
      const { div, email } = EmailNode.create(item);
      containerNode.insertBefore(div, input);
      // add email to local list
      emailList.push(email);
    });

    // const selection = window.getSelection();
    // if (!selection.rangeCount) return false;
    // selection.deleteFromDocument();
    // selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    //
    // event.preventDefault();
  };

  const _setEventListeners = () => {
    // keyup -> _onKeyUp -> if (comma|Enter) -> _dispatchCompleteInput -> _convertInputToNode
    containerNode.addEventListener('keyup', _onKeyUp);

    // focusout -> _onFocusout -> _dispatchCompleteInput -> _convertInputToNode
    containerNode.addEventListener('focusout', _onFocusout);

    containerNode.addEventListener(COMPLETE_INPUT, _convertInputToNode);

    // click -> _onClick -> check it is a delete element -> _dispatchDeleteEmailNode -> _deleteTargetEmail
    containerNode.addEventListener('click', _onClick);
    containerNode.addEventListener(DELETE_EMAIL_NODE, _deleteTargetEmail);

    // clipboard
    containerNode.addEventListener('paste', _onPaste, true);
  };

  const _validateIncomingEmails = (emails: string[] | any) => {
    if (
      !Array.isArray(emails) ||
      emails.filter(email => typeof email !== 'string')[0]
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
    emailList = [];
    emails.forEach(email => {
      const { div: item, email: finalEmailString } = EmailNode.create(email);
      containerNode.appendChild<HTMLDivElement>(item);
      // add the same email string (as it is in email node) to emailList
      emailList.push(finalEmailString);
    });
    containerNode
      .appendChild<HTMLInputElement>(InputNode.create())
      .scrollIntoView();
  };

  // call constructor before returning API
  _constructor();
  return {
    getEmails,
    setEmails,
    isEmailValid: validateEmail,
  };
}

// @ts-ignore
window['EmailsInput'] = EmailsInput;
