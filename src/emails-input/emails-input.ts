import polyfills from './polyfills';
import styles from './styles';
import { EmailNode } from './email-node';
import { InputNode } from './input-node';
import { isFunction, parsePastedText, validateEmail } from './utils';

polyfills(); // support IE11
// custom events
export const COMPLETE_INPUT = 'emails-input--complete-input-node';
export const DELETE_EMAIL_NODE = 'emails-input--delete-email-node';

interface EmailChangeCallbackFn {
  (emails: string[]): void;
}
interface UnsubscribeFn {
  (): void;
}

export interface EmailsInputAPI {
  getEmails: () => string[];
  setEmails: (emails: string[]) => void;
  onEmailsChange: (callback: EmailChangeCallbackFn) => UnsubscribeFn;
  // extra method
  isEmailValid: (email: string) => boolean;
}

export interface Config {
  defaultEmails: string[];
  maxHeight: string;
  minHeight: string;
}

export function EmailsInput(
  containerNode: HTMLElement,
  config: Partial<Config> = {}
): EmailsInputAPI {
  let rootNode: HTMLDivElement;
  let emailList: string[];
  const emailsChangeObservers: EmailChangeCallbackFn[] = [];

  const _throwError = (message: string) => {
    throw new Error(`EmailsInput : ${message}`);
  };

  const _validateFirstArgument = (node: any) => {
    if (!(node instanceof HTMLElement)) {
      _throwError('constructor expects HTMLElement as the first argument');
    }
  };
  const _validateSecondArgument = (config: Partial<Config> | any) => {
    if (!(config instanceof Object)) {
      _throwError('constructor expects Object as the second argument');
    }
    const { defaultEmails, maxHeight, minHeight } = config;
    // throw if 1) not an array (skip if undefined)  2) or array is not empty and at least one element is not a string
    if (
      (defaultEmails !== undefined && !Array.isArray(defaultEmails)) ||
      (Array.isArray(defaultEmails) &&
        defaultEmails?.length > 0 &&
        defaultEmails?.filter((item: any) => typeof item !== 'string').length >
          0)
    ) {
      _throwError('config.defaultEmails should be a type of string[]');
    }

    if (maxHeight !== undefined && typeof maxHeight !== 'string') {
      _throwError('config.maxHeight should be a type of string');
    }
    if (minHeight !== undefined && typeof minHeight !== 'string') {
      _throwError('config.minHeight should be a type of string');
    }
  };

  const _addInputNode = () => {
    rootNode.appendChild<HTMLInputElement>(InputNode.create());
  };

  /**
   * notify all emailsChangeObservers
   * this method is called when emailsList is changed
   *
   */
  const _fireOnEmailsChange = () => {
    emailsChangeObservers.forEach((callback: EmailChangeCallbackFn) => {
      callback.call(null, emailList);
    });
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
    const email = target.value?.replace(/,/g, '');
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
    // clean up value in the input node
    target.value = '';

    _fireOnEmailsChange();
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
    // remove email node; IE11 does not support .remove method; so using removeChild instead
    emailNode.parentElement.removeChild(emailNode);

    _fireOnEmailsChange();
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
    const input = rootNode.lastChild as HTMLInputElement;
    // if only one email in clipboard then put the value in input
    if (parsed.length < 2) {
      parsed[0] && (input.value = parsed[0]);
      return;
    }
    // otherwise add them all immediately
    // add new emails without re-rendering existing ones
    parsed.forEach(item => {
      const { div, email } = EmailNode.create(item);
      rootNode.insertBefore(div, input);
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
    rootNode.addEventListener('keyup', _onKeyUp);

    // focusout -> _onFocusout -> _dispatchCompleteInput -> _convertInputToNode
    rootNode.addEventListener('focusout', _onFocusout);

    rootNode.addEventListener(COMPLETE_INPUT, _convertInputToNode);

    // click -> _onClick -> check it is a delete element -> _dispatchDeleteEmailNode -> _deleteTargetEmail
    rootNode.addEventListener('click', _onClick);
    rootNode.addEventListener(DELETE_EMAIL_NODE, _deleteTargetEmail);

    // clipboard
    rootNode.addEventListener('paste', _onPaste, true);
  };

  const _validateIncomingEmails = (emails: string[] | any) => {
    if (
      !Array.isArray(emails) ||
      emails.filter(email => typeof email !== 'string')[0]
    ) {
      _throwError(
        'setEmails method expects an array of strings as an argument'
      );
    }
  };

  const _clearChildren = () => {
    rootNode.innerHTML = '';
  };
  const setEmails = (emails: string[]): void => {
    _validateIncomingEmails(emails);
    _clearChildren();
    emailList = [];
    emails.forEach(email => {
      const { div: item, email: finalEmailString } = EmailNode.create(email);
      rootNode.appendChild<HTMLDivElement>(item);
      // add the same email string (as it is in email node) to emailList
      emailList.push(finalEmailString);
    });
    rootNode.appendChild<HTMLInputElement>(InputNode.create()).scrollIntoView();

    _fireOnEmailsChange();
  };

  const _applyConfig = (config: Partial<Config>) => {
    const { defaultEmails, maxHeight, minHeight } = config;
    if (defaultEmails) {
      setEmails(defaultEmails);
    }
    if (maxHeight) {
      rootNode.style.maxHeight = maxHeight;
    }
    if (minHeight) {
      rootNode.style.minHeight = minHeight;
    }
  };

  const onEmailsChange = (callback: EmailChangeCallbackFn): UnsubscribeFn => {
    // validate argument
    if (!isFunction(callback)) {
      _throwError('onEmailsChange method expects a function as an argument');
    }

    emailsChangeObservers.push(callback);
    // build unsubscribe function
    return () => {
      // remove originalCallback from the list
      const index = emailsChangeObservers.indexOf(callback);
      if (index > -1) {
        emailsChangeObservers.splice(index, 1);
      }
    };
  };
  const _constructor = () => {
    emailList = [];
    _validateFirstArgument(containerNode);
    _validateSecondArgument(config);
    // create rootNode and append it to container
    rootNode = document.createElement('div');
    containerNode.appendChild(rootNode);
    _addInputNode();
    _applyConfig(config);
    // set style to root container
    rootNode.classList.add(styles.emailsInput);
    _setEventListeners();
  };

  // call constructor before returning API
  _constructor();
  return {
    getEmails,
    setEmails,
    onEmailsChange,
    isEmailValid: validateEmail,
  };
}

// @ts-ignore
window['EmailsInput'] = EmailsInput;
