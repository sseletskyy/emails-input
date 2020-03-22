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

interface EmailsInputComponentInterface {
  getEmails: () => string[];
  setEmails: (emails: string[]) => void;
  onEmailsChange: (callback: EmailChangeCallbackFn) => UnsubscribeFn;
  // extra method
  isEmailValid: (email: string) => boolean;
  destroy: () => void;
}

class EmailsInputComponent implements EmailsInputComponentInterface {
  rootNode: HTMLDivElement;
  emailList: string[];
  emailsChangeObservers: Set<EmailChangeCallbackFn> = new Set<
    EmailChangeCallbackFn
  >();
  destroyed: boolean; // flag is set to true in destroy method
  containerNode: HTMLElement;
  eventListenersMap: Record<string, EventListener>; // keeps all .bind(this) event listeners
  constructor(containerNode: HTMLElement, config: Partial<Config> = {}) {
    EmailsInputComponent._validateFirstArgument(containerNode);
    EmailsInputComponent._validateSecondArgument(config);

    this.emailList = [];
    this.eventListenersMap = {};
    this.destroyed = false;
    // clean up containerNode content
    this.containerNode = containerNode;
    this.containerNode.innerHTML = '';
    // create rootNode and append it to container
    this.rootNode = document.createElement('div');
    containerNode.appendChild(this.rootNode);
    this._addInputNode();
    this._applyConfig(config);
    // set style to root container
    this.rootNode.classList.add(styles.emailsInput);
    this._setEventListeners();
  }

  private static _throwError(message: string) {
    throw new Error(`EmailsInput : ${message}`);
  }

  private static _validateFirstArgument(node: any) {
    if (!(node instanceof HTMLElement)) {
      EmailsInputComponent._throwError(
        'constructor expects HTMLElement as the first argument'
      );
    }
  }
  private static _validateSecondArgument(config: Partial<Config> | any) {
    if (!(config instanceof Object)) {
      EmailsInputComponent._throwError(
        'constructor expects Object as the second argument'
      );
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
      EmailsInputComponent._throwError(
        'config.defaultEmails should be a type of string[]'
      );
    }

    if (maxHeight !== undefined && typeof maxHeight !== 'string') {
      EmailsInputComponent._throwError(
        'config.maxHeight should be a type of string'
      );
    }
    if (minHeight !== undefined && typeof minHeight !== 'string') {
      EmailsInputComponent._throwError(
        'config.minHeight should be a type of string'
      );
    }
  }
  private _addInputNode() {
    this.rootNode.appendChild<HTMLInputElement>(InputNode.create());
  }

  /**
   * notify all emailsChangeObservers
   * this method is called when emailsList is changed
   *
   */
  private _fireOnEmailsChange() {
    this.emailsChangeObservers.forEach((callback: EmailChangeCallbackFn) => {
      callback.call(null, this.emailList);
    });
  }

  private _dispatchCompleteInput(target: HTMLInputElement) {
    const customEvent = new CustomEvent(COMPLETE_INPUT, {
      bubbles: true,
    });
    return target.dispatchEvent(customEvent);
  }

  private _dispatchDeleteEmailNode(event: Event) {
    const targetSpan: HTMLSpanElement = event.target as HTMLSpanElement;
    const customEvent = new CustomEvent(DELETE_EMAIL_NODE, {
      bubbles: true,
    });
    return targetSpan.dispatchEvent(customEvent);
  }
  // this is a listener of the custom event COMPLETE_INPUT
  private _convertInputToNode(event: CustomEvent) {
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
    this.emailList.push(email);
    // clean up value in the input node
    target.value = '';

    this._fireOnEmailsChange();
  }
  private _deleteTargetEmail(event: CustomEvent) {
    const target = event.target as HTMLDivElement;
    const { parentElement: emailNode } = target;
    // remove email from emailList
    const email = emailNode.getAttribute('data-email');
    const emailIndex = this.emailList.indexOf(email);
    if (emailIndex >= 0) {
      this.emailList.splice(emailIndex, 1);
    }
    // remove email node; IE11 does not support .remove method; so using removeChild instead
    emailNode.parentElement.removeChild(emailNode);

    this._fireOnEmailsChange();
  }

  private _onKeyUp(event: KeyboardEvent) {
    // keyCode and comparison with numbers are for backward compatibility with IE
    // noinspection JSDeprecatedSymbols
    const key = event.key || event.keyCode;
    if (key === 'Enter' || key === 13 || key === ',' || key === 188) {
      this._dispatchCompleteInput(event.target as HTMLInputElement);
    }
  }

  private _onFocusout(event: Event) {
    this._dispatchCompleteInput(event.target as HTMLInputElement);
  }

  private _onClick(event: MouseEvent) {
    // call custom event only if clicked on cross character in email-node
    const target: HTMLElement = event.target as HTMLElement;
    if (EmailNode.isDeleteButton(target)) {
      this._dispatchDeleteEmailNode(event);
    }
  }

  // this method is not covered with tests cause js-dom does not support ClipboardEvent
  // so the logic of parsing is moved to utils :: parsePastedText and covered with unit tests
  private _onPaste(event: ClipboardEvent) {
    event.preventDefault();

    // @ts-ignore
    const text = (event.clipboardData || window.clipboardData).getData('text');
    const parsed = parsePastedText(text);
    const input = this.rootNode.lastChild as HTMLInputElement;
    // if only one email in clipboard then put the value in input
    if (parsed.length < 2) {
      parsed[0] && (input.value = parsed[0]);
      return;
    }
    // otherwise add them all immediately
    // add new emails without re-rendering existing ones
    parsed.forEach(item => {
      const { div, email } = EmailNode.create(item);
      this.rootNode.insertBefore(div, input);
      // add email to local list
      this.emailList.push(email);
    });
  }

  private _setEventListeners() {
    /**
     * because of every listener should bind its context
     * we need to save a bind version of the listener to be used later
     * in _removeEventListeners
     */
    this.eventListenersMap.keyup = this._onKeyUp.bind(this);
    this.eventListenersMap.focusout = this._onFocusout.bind(this);
    this.eventListenersMap[COMPLETE_INPUT] = this._convertInputToNode.bind(
      this
    );
    this.eventListenersMap.click = this._onClick.bind(this);
    this.eventListenersMap[DELETE_EMAIL_NODE] = this._deleteTargetEmail.bind(
      this
    );
    this.eventListenersMap.paste = this._onPaste.bind(this);

    // keyup -> _onKeyUp -> if (comma|Enter) -> _dispatchCompleteInput -> _convertInputToNode
    this.rootNode.addEventListener('keyup', this.eventListenersMap.keyup);

    // focusout -> _onFocusout -> _dispatchCompleteInput -> _convertInputToNode
    this.rootNode.addEventListener('focusout', this.eventListenersMap.focusout);

    this.rootNode.addEventListener(
      COMPLETE_INPUT,
      this.eventListenersMap[COMPLETE_INPUT]
    );

    // click -> _onClick -> check it is a delete element -> _dispatchDeleteEmailNode -> _deleteTargetEmail
    this.rootNode.addEventListener('click', this.eventListenersMap.click);

    this.rootNode.addEventListener(
      DELETE_EMAIL_NODE,
      this.eventListenersMap[DELETE_EMAIL_NODE]
    );

    // clipboard
    this.rootNode.addEventListener('paste', this.eventListenersMap.paste, true);
  }

  private _removeEventListeners() {
    // in reverse order
    this.rootNode.removeEventListener(
      'paste',
      this.eventListenersMap.paste,
      true
    );
    this.rootNode.removeEventListener(
      DELETE_EMAIL_NODE,
      this.eventListenersMap[DELETE_EMAIL_NODE]
    );
    this.rootNode.removeEventListener('click', this.eventListenersMap.click);
    this.rootNode.removeEventListener(
      COMPLETE_INPUT,
      this.eventListenersMap[COMPLETE_INPUT]
    );
    this.rootNode.removeEventListener(
      'focusout',
      this.eventListenersMap.focusout
    );
    this.rootNode.removeEventListener('keyup', this.eventListenersMap.keyup);
  }

  private static _validateIncomingEmails(emails: string[] | any) {
    if (
      !Array.isArray(emails) ||
      emails.filter(email => typeof email !== 'string')[0]
    ) {
      EmailsInputComponent._throwError(
        'setEmails method expects an array of strings as an argument'
      );
    }
  }
  private _clearChildren() {
    this.rootNode.innerHTML = '';
  }

  private _applyConfig(config: Partial<Config>) {
    const { defaultEmails, maxHeight, minHeight } = config;
    if (defaultEmails) {
      this.setEmails(defaultEmails);
    }
    if (maxHeight) {
      this.rootNode.style.maxHeight = maxHeight;
    }
    if (minHeight) {
      this.rootNode.style.minHeight = minHeight;
    }
  }

  public getEmails(): string[] {
    // return a cloned array, no way to impact on the list outside
    return Array.apply({}, this.emailList);
  }

  public setEmails(emails: string[]): void {
    // do nothing if destroy method was called
    if (this.destroyed) {
      return;
    }
    EmailsInputComponent._validateIncomingEmails(emails);
    this._clearChildren();
    this.emailList = [];
    emails.forEach(email => {
      const { div: item, email: finalEmailString } = EmailNode.create(email);
      this.rootNode.appendChild<HTMLDivElement>(item);
      // add the same email string (as it is in email node) to emailList
      this.emailList.push(finalEmailString);
    });
    this.rootNode.appendChild<HTMLInputElement>(InputNode.create());
    // .scrollIntoView();

    this._fireOnEmailsChange();
  }

  public onEmailsChange(callback: EmailChangeCallbackFn): UnsubscribeFn {
    // validate argument
    if (!isFunction(callback)) {
      EmailsInputComponent._throwError(
        'onEmailsChange method expects a function as an argument'
      );
    }

    this.emailsChangeObservers.add(callback);
    // build unsubscribe function
    return () => {
      // remove originalCallback from the list
      this.emailsChangeObservers.delete(callback);
    };
  }

  public isEmailValid(email: string): boolean {
    return validateEmail(email);
  }

  /**
   * call this method before considering deleting the containerNode
   * returns true if called first time, otherwise returns false
   */
  public destroy(): boolean {
    if (this.destroyed) {
      return false;
    }
    this.destroyed = true;
    this._removeEventListeners();
    // remove observers
    this.emailsChangeObservers.clear();
    // clean up containerNode
    this.containerNode.innerHTML = '';
    // clean up emailList
    this.emailList = [];
    return true;
  }
}

export function EmailsInput(
  containerNode: HTMLElement,
  config: Partial<Config> = {}
): EmailsInputAPI {
  const instance = new EmailsInputComponent(containerNode, config);
  return {
    getEmails: instance.getEmails.bind(instance),
    setEmails: instance.setEmails.bind(instance),
    destroy: instance.destroy.bind(instance),
    isEmailValid: instance.isEmailValid.bind(instance),
    onEmailsChange: instance.onEmailsChange.bind(instance),
  };
}

// @ts-ignore
window['EmailsInputClass'] = EmailsInput;
