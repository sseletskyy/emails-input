import polyfills from './polyfills';
import styles from './styles';
import { EmailNode } from './email-node';
import { InputNode } from './input-node';
import { isFunction, parsePastedText, validateEmail } from './utils';
import {
  Config,
  EmailChangeCallbackFn,
  EmailsInputAPI,
  UnsubscribeFn,
} from './interfaces';

polyfills(); // support IE11
// custom events
export const COMPLETE_INPUT = 'emails-input--complete-input-node';
export const DELETE_EMAIL_NODE = 'emails-input--delete-email-node';

export function EmailsInput(
  containerNode: HTMLElement,
  config: Partial<Config> = {}
): EmailsInputAPI {
  /**
   * local params
   */
  let rootNode: HTMLDivElement;
  const emailList: string[] = [];
  const emailsChangeObservers: Set<EmailChangeCallbackFn> = new Set<
    EmailChangeCallbackFn
  >();
  let destroyed = false; // flag is set to true in destroy method

  const getEmails = (): string[] => {
    // return a cloned array, no way to impact on the list outside
    return Array.apply({}, emailList);
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

    EmailsInput._fireOnEmailsChange(emailsChangeObservers, getEmails());
  };

  const _deleteTargetEmail = (event: CustomEvent) => {
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

    EmailsInput._fireOnEmailsChange(emailsChangeObservers, getEmails());
  };

  const _setDynamicEventListeners = () => {
    rootNode.addEventListener(COMPLETE_INPUT, _convertInputToNode);
    rootNode.addEventListener(DELETE_EMAIL_NODE, _deleteTargetEmail);
    // clipboard
    rootNode.addEventListener(
      'paste',
      EmailsInput._onPaste(rootNode, emailList),
      true
    );
  };

  const _removeDynamicEventListeners = () => {
    rootNode.removeEventListener(DELETE_EMAIL_NODE, _deleteTargetEmail);
    rootNode.removeEventListener(COMPLETE_INPUT, _convertInputToNode);
    rootNode.removeEventListener(
      'paste',
      EmailsInput._onPaste(rootNode, emailList),
      true
    );
  };

  const setEmails = (emails: string[]): void => {
    // do nothing if destroy method was called
    if (destroyed) {
      return;
    }
    EmailsInput._validateIncomingEmails(emails);

    // clear children
    rootNode.innerHTML = '';
    emailList.length = 0; // clears array without creating a new one (pointer remains)
    emails.forEach(email => {
      const { div: item, email: finalEmailString } = EmailNode.create(email);
      rootNode.appendChild<HTMLDivElement>(item);
      // add the same email string (as it is in email node) to emailList
      emailList.push(finalEmailString);
    });
    rootNode.appendChild<HTMLInputElement>(InputNode.create());
    // .scrollIntoView();

    EmailsInput._fireOnEmailsChange(emailsChangeObservers, getEmails());
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
      EmailsInput._throwError(
        'onEmailsChange method expects a function as an argument'
      );
    }

    emailsChangeObservers.add(callback);
    // build unsubscribe function
    return () => {
      // remove originalCallback from the list
      emailsChangeObservers.delete(callback);
    };
  };
  /**
   * call this method before considering deleting the containerNode
   * returns true if called first time, otherwise returns false
   */
  const destroy = (): boolean => {
    if (destroyed) {
      return false;
    }
    destroyed = true;
    EmailsInput._removeStaticEventListeners(rootNode);
    _removeDynamicEventListeners();
    // remove observers
    emailsChangeObservers.clear();
    // clean up containerNode
    containerNode.innerHTML = '';
    // clean up emailList
    emailList.length = 0;
    return true;
  };

  const _constructor = () => {
    emailList.length = 0;
    EmailsInput._validateFirstArgument(containerNode);
    EmailsInput._validateSecondArgument(config);
    // clean up containerNode content
    containerNode.innerHTML = '';
    // create rootNode and append it to container
    rootNode = document.createElement('div');
    containerNode.appendChild(rootNode);
    // add InputNode
    rootNode.appendChild<HTMLInputElement>(InputNode.create());
    _applyConfig(config);
    // set style to root container
    rootNode.classList.add(styles.emailsInput);
    EmailsInput._setStaticEventListeners(rootNode);
    _setDynamicEventListeners();
  };

  // call constructor before returning API
  _constructor();
  return {
    getEmails,
    setEmails,
    onEmailsChange,
    isEmailValid: validateEmail,
    destroy,
  };
}

EmailsInput._throwError = function(message: string) {
  throw new Error(`EmailsInput : ${message}`);
};

EmailsInput._validateFirstArgument = function(node: any) {
  if (!(node instanceof HTMLElement)) {
    EmailsInput._throwError(
      'constructor expects HTMLElement as the first argument'
    );
  }
};
EmailsInput._validateSecondArgument = function(config: Partial<Config> | any) {
  if (!(config instanceof Object)) {
    EmailsInput._throwError(
      'constructor expects Object as the second argument'
    );
  }
  const { defaultEmails, maxHeight, minHeight } = config;
  // throw if 1) not an array (skip if undefined)  2) or array is not empty and at least one element is not a string
  if (
    (defaultEmails !== undefined && !Array.isArray(defaultEmails)) ||
    (Array.isArray(defaultEmails) &&
      defaultEmails?.length > 0 &&
      defaultEmails?.filter((item: any) => typeof item !== 'string').length > 0)
  ) {
    EmailsInput._throwError(
      'config.defaultEmails should be a type of string[]'
    );
  }

  if (maxHeight !== undefined && typeof maxHeight !== 'string') {
    EmailsInput._throwError('config.maxHeight should be a type of string');
  }
  if (minHeight !== undefined && typeof minHeight !== 'string') {
    EmailsInput._throwError('config.minHeight should be a type of string');
  }
};
EmailsInput._validateIncomingEmails = function(emails: string[] | any) {
  if (
    !Array.isArray(emails) ||
    emails.filter(email => typeof email !== 'string')[0]
  ) {
    EmailsInput._throwError(
      'setEmails method expects an array of strings as an argument'
    );
  }
};
EmailsInput._dispatchDeleteEmailNode = function(event: Event) {
  const targetSpan: HTMLSpanElement = event.target as HTMLSpanElement;
  const customEvent = new CustomEvent(DELETE_EMAIL_NODE, {
    bubbles: true,
  });
  return targetSpan.dispatchEvent(customEvent);
};
EmailsInput._dispatchCompleteInput = function(target: HTMLInputElement) {
  const customEvent = new CustomEvent(COMPLETE_INPUT, {
    bubbles: true,
  });
  return target.dispatchEvent(customEvent);
};
EmailsInput._onKeyUp = function(event: KeyboardEvent) {
  // keyCode and comparison with numbers are for backward compatibility with IE
  // noinspection JSDeprecatedSymbols
  const key = event.key || event.keyCode;
  if (key === 'Enter' || key === 13 || key === ',' || key === 188) {
    EmailsInput._dispatchCompleteInput(event.target as HTMLInputElement);
  }
};
EmailsInput._onFocusout = function(event: Event) {
  EmailsInput._dispatchCompleteInput(event.target as HTMLInputElement);
};

EmailsInput._onClick = function(event: MouseEvent) {
  // call custom event only if clicked on cross character in email-node
  const target: HTMLElement = event.target as HTMLElement;
  if (EmailNode.isDeleteButton(target)) {
    EmailsInput._dispatchDeleteEmailNode(event);
  }
};
// this method is not covered with tests cause js-dom does not support ClipboardEvent
// so the logic of parsing is moved to utils :: parsePastedText and covered with unit tests
EmailsInput._onPaste = (rootNode: HTMLElement, emailList: string[]) => (
  event: ClipboardEvent
) => {
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
};
/**
 * notify all emailsChangeObservers
 * this method is called when emailsList is changed
 *
 */
EmailsInput._fireOnEmailsChange = function(
  emailsChangeObservers: Set<EmailChangeCallbackFn>,
  emailList: string[]
) {
  emailsChangeObservers.forEach((callback: EmailChangeCallbackFn) => {
    callback.call(null, emailList);
  });
};
EmailsInput._setStaticEventListeners = function(rootNode: HTMLElement) {
  // keyup -> _onKeyUp -> if (comma|Enter) -> _dispatchCompleteInput -> _convertInputToNode
  rootNode.addEventListener('keyup', EmailsInput._onKeyUp);

  // focusout -> _onFocusout -> _dispatchCompleteInput -> _convertInputToNode
  rootNode.addEventListener('focusout', EmailsInput._onFocusout);

  // click -> _onClick -> check it is a delete element -> _dispatchDeleteEmailNode -> _deleteTargetEmail
  rootNode.addEventListener('click', EmailsInput._onClick);
};
EmailsInput._removeStaticEventListeners = function(rootNode: HTMLElement) {
  rootNode.removeEventListener('click', EmailsInput._onClick);
  rootNode.removeEventListener('focusout', EmailsInput._onFocusout);
  rootNode.removeEventListener('keyup', EmailsInput._onKeyUp);
};

// hides access to all static methods available directly like EmailsInput.<name>
function wrapper(
  containerNode: HTMLElement,
  config: Partial<Config> = {}
): EmailsInputAPI {
  return EmailsInput(containerNode, config);
}
// @ts-ignore
window['EmailsInput'] = wrapper;
