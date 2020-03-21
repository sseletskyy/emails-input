import { EmailsInput, EmailsInputAPI, COMPLETE_INPUT } from '../emails-input';
import { getChildren } from '../test-helper';
// scrollIntoView is not supported by jsdom
window.HTMLElement.prototype.scrollIntoView = function() {};
const sandbox = (additionalTags: string = '') => {
  document.body.innerHTML = `
<div id="emails-input"></div>
${additionalTags}
`;
};
const VALID_EMAIL = 'mike@miro.com';
const INVALID_EMAIL = 'invalid@';
const INPUT_SELECTOR = 'input.input';

const checkNodeIsAnInput = (node: HTMLInputElement | any): void => {
  expect(node.type).toEqual('text');
  expect(node.tagName.toLowerCase()).toEqual('input');
};

describe('EmailsInput', () => {
  beforeEach(() => {
    sandbox();
  });
  it('should be available', () => {
    expect(EmailsInput).toBeTruthy();
  });
  describe('instance should provide the following behavior', () => {
    let instance: EmailsInputAPI;
    let divContainer: HTMLDivElement;
    beforeEach(() => {
      divContainer = document.querySelector('#emails-input');
      instance = EmailsInput(divContainer);
    });
    it('initially should generate an input node', () => {
      const children = getChildren(divContainer);
      expect(children.length).toEqual(1);
      checkNodeIsAnInput(children[0]);
    });
    describe('input node should provide the following behavior', () => {
      describe('email node should be created because of the custom event is dispatched', () => {
        it('when Enter pressed', () => {
          // arrange
          let children = getChildren(divContainer);
          expect(children.length).toEqual(1);
          // find input node
          const inputNode: HTMLInputElement = divContainer.querySelector(
            'input.input'
          );
          inputNode.value = VALID_EMAIL;
          // simulate the final completion event initiated from [enter]
          const enterEvent = new KeyboardEvent('keyup', {
            bubbles: true,
            key: 'Enter',
          });

          // act
          inputNode.dispatchEvent(enterEvent);

          // assert
          children = getChildren(divContainer);
          expect(children.length).toEqual(2);
        });
        it('when comma pressed last; comma should not be in email node', () => {
          // arrange
          const emailWithoutComma = 'no@comma.email';
          const emailWithComma = emailWithoutComma + ',';
          let children = getChildren(divContainer);
          expect(children.length).toEqual(1);
          // find input node
          const inputNode: HTMLInputElement = divContainer.querySelector(
            'input.input'
          );
          inputNode.value = emailWithComma;
          // simulate the final completion event initiated from [comma]
          const commaEvent = new KeyboardEvent('keyup', {
            bubbles: true,
            key: ',',
          });

          // act
          inputNode.dispatchEvent(commaEvent);

          // assert
          children = getChildren(divContainer);
          expect(children.length).toEqual(2);
          // check no comma
          const textBeforeSpanTag = children[0].innerHTML.split('<')[0];
          expect(textBeforeSpanTag).toEqual(emailWithoutComma);
        });
        it('when onFocusout event happens', () => {
          // arrange
          let children = getChildren(divContainer);
          expect(children.length).toEqual(1);
          // find input node
          const inputNode: HTMLInputElement = document.querySelector(
            INPUT_SELECTOR
          );
          inputNode.value = INVALID_EMAIL;

          // simulate the final completion event initiated from focusout
          const focusoutEvent = new Event('focusout', {
            bubbles: true,
          });
          // act
          inputNode.dispatchEvent(focusoutEvent);
          // assert
          children = getChildren(divContainer);
          expect(children.length).toEqual(2);
          expect(children[0].innerHTML).toContain(INVALID_EMAIL);
        });
      });
      describe('email node should NOT be created with the custom event is dispatched', () => {
        it('if input is empty', () => {
          // arrange
          let children = getChildren(divContainer);
          expect(children.length).toEqual(1);
          // find input node
          const inputNode: HTMLInputElement = document.querySelector(
            INPUT_SELECTOR
          );
          inputNode.value = '';
          // simulate the final completion event initiated from [enter], [comma] or out of focus
          const customEvent = new CustomEvent(COMPLETE_INPUT, {
            bubbles: true,
          });

          // act
          inputNode.dispatchEvent(customEvent);

          // assert
          children = getChildren(divContainer);
          expect(children.length).toEqual(1);
        });
        it('if input contains only comma', () => {
          // arrange
          let children = getChildren(divContainer);
          expect(children.length).toEqual(1);
          // find input node
          const inputNode: HTMLInputElement = document.querySelector(
            INPUT_SELECTOR
          );
          inputNode.value = ',';
          // simulate the final completion event initiated from [enter], [comma] or out of focus
          const customEvent = new CustomEvent(COMPLETE_INPUT, {
            bubbles: true,
          });

          // act
          inputNode.dispatchEvent(customEvent);

          // assert
          children = getChildren(divContainer);
          expect(children.length).toEqual(1);
        });
        it('if input contains only multiple commas', () => {
          // arrange
          let children = getChildren(divContainer);
          expect(children.length).toEqual(1);
          // find input node
          const inputNode: HTMLInputElement = document.querySelector(
            INPUT_SELECTOR
          );
          inputNode.value = ',,,,';
          // simulate the final completion event initiated from [enter], [comma] or out of focus
          const customEvent = new CustomEvent(COMPLETE_INPUT, {
            bubbles: true,
          });

          // act
          inputNode.dispatchEvent(customEvent);

          // assert
          children = getChildren(divContainer);
          expect(children.length).toEqual(1);
        });
      });
    });
    describe('email node should provide the following behavior', () => {
      describe('email node should be deleted because of the custom event is dispatched', () => {
        it('when clicked on cross icon', () => {
          // arrange
          instance.setEmails([VALID_EMAIL, INVALID_EMAIL]);
          let children = getChildren(divContainer);
          expect(children.length).toEqual(3);
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
          });

          // act - delete INVALID_EMAIL
          children[1].querySelector('span').dispatchEvent(clickEvent);

          // assert
          children = getChildren(divContainer);
          expect(children.length).toEqual(2);
          expect(children[0].innerHTML).toContain(VALID_EMAIL);
        });
      });
      describe('when email node is deleted', () => {
        it('emailsList should be updated', () => {
          // arrange
          instance.setEmails([VALID_EMAIL, INVALID_EMAIL]);
          const children = getChildren(divContainer);
          // initial assert
          expect(instance.getEmails().length).toEqual(2);
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
          });

          // act - delete INVALID_EMAIL
          children[1].querySelector('span').dispatchEvent(clickEvent);

          // assert
          const emails = instance.getEmails();
          expect(emails.length).toEqual(1);
          expect(emails[0]).toEqual(VALID_EMAIL);
        });
      });
      describe('parent component (email-inputs) should not be deleted', () => {
        it('when clicked on email node (but not on cross icon)', () => {
          // arrange
          instance.setEmails([VALID_EMAIL, INVALID_EMAIL]);
          let children = getChildren(divContainer);
          expect(children.length).toEqual(3);
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
          });

          // act - click on email node
          children[1].dispatchEvent(clickEvent);

          // assert
          expect(document.querySelector('#emails-input')).toBeTruthy();
        });
      });
    });
  });

  describe('instance should implement the following API', () => {
    let instance: EmailsInputAPI;
    let divContainer: HTMLDivElement;
    beforeEach(() => {
      divContainer = document.querySelector('#emails-input');
      instance = EmailsInput(divContainer);
    });
    describe('getEmails', () => {
      it('should return empty array initially', () => {
        expect(instance.getEmails).toBeTruthy();
        expect(instance.getEmails()).toEqual([]);
      });
      it('should return non empty array if emails exist', () => {
        const emails: string[] = ['A', 'B', 'C'];
        instance.setEmails(emails);
        expect(instance.getEmails()).toEqual(emails);
      });
      it('should clean up emailsList at the beginning', () => {
        instance.setEmails([VALID_EMAIL]);
        instance.setEmails([VALID_EMAIL, INVALID_EMAIL]);
        instance.setEmails([VALID_EMAIL, INVALID_EMAIL, '3']);
        expect(instance.getEmails().length).toEqual(3);
      });
    });
    describe('setEmails', () => {
      it('expects array as an argument', () => {
        expect(instance.setEmails).toBeTruthy();
        expect(() => {
          // @ts-ignore
          instance.setEmails(123);
        }).toThrowError(
          new Error(
            'EmailsInput : setEmails method expects an array of strings as an argument'
          )
        );
      });
      it('expects array of strings as an argument', () => {
        expect(instance.setEmails).toBeTruthy();
        expect(() => {
          // @ts-ignore
          instance.setEmails(['123', 123]);
        }).toThrowError(
          new Error(
            'EmailsInput : setEmails method expects an array of strings as an argument'
          )
        );
      });
      it('should replace current emails with provided array', () => {
        instance.setEmails([VALID_EMAIL]);
        const children = getChildren(divContainer);
        expect(children[0].innerHTML).toContain(VALID_EMAIL);
        checkNodeIsAnInput(children[1]);
      });
      it('should replace current emails with provided array (check several items)', () => {
        instance.setEmails([VALID_EMAIL, INVALID_EMAIL]);
        const children = getChildren(divContainer);
        expect(children[0].innerHTML).toContain(VALID_EMAIL);
        expect(children[1].innerHTML).toContain(INVALID_EMAIL);
      });
      it('should keep an input node at the end', () => {
        instance.setEmails([VALID_EMAIL, INVALID_EMAIL]);
        const children = getChildren(divContainer);
        checkNodeIsAnInput(children[2]);
      });
      it('should set nodes correctly after calling setEmails multiple times', () => {
        instance.setEmails([VALID_EMAIL]);
        instance.setEmails([VALID_EMAIL, INVALID_EMAIL]);
        instance.setEmails([VALID_EMAIL, INVALID_EMAIL, '3']);
        instance.setEmails([VALID_EMAIL, INVALID_EMAIL, '3', '4']);
        const children = getChildren(divContainer);
        expect(children.length).toEqual(4 + 1);
        checkNodeIsAnInput(children[4]);
      });
    });
    describe('extra method isEmailValid', () => {
      it('should return true for provided valid email', () => {
        expect(instance.isEmailValid('michael@miro.com')).toEqual(true);
      });
      it('should return false for provided invalid email', () => {
        expect(instance.isEmailValid('invalid_one')).toEqual(false);
      });
    });
  });
  describe('Use Case: Add Email - using external btn to add a new email', () => {
    /**
     * according to API requirements external button can add an new email only with replacing all others
     * in three steps
     * 1) getEmails as an array
     * 2) push new email to the array
     * 3) setEmails with an updated array
     */
    let instance: EmailsInputAPI;
    let divContainer: HTMLDivElement;
    let addBtn: HTMLElement;
    beforeEach(() => {
      sandbox(`<button id="add-email" />`);
      divContainer = document.querySelector('#emails-input');
      instance = EmailsInput(divContainer);
      addBtn = document.getElementById('add-email');
    });
    it('when click on external btn should re-render EmailInput with the same list of emails plus one new', () => {
      // arrange
      const initialEmails = ['A', 'B', 'C'];
      const newEmail = 'random@email.com';
      instance.setEmails(initialEmails);
      // set click handler: getEmails, update array, setEmails
      const addBtnClickHandler = () => {
        const emails: string[] = instance.getEmails();
        emails.push(newEmail);
        instance.setEmails(emails);
      };
      // initial assert
      let children = getChildren(divContainer);
      expect(children.length).toEqual(initialEmails.length + 1); // plus input
      // attach handler
      addBtn.addEventListener('click', addBtnClickHandler);
      // act
      addBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      // assert
      children = getChildren(divContainer);
      expect(children.length).toEqual(initialEmails.length + 1 + 1); // plus input + added email
    });
  });
  describe('Use Case: Get valid emails count', () => {
    let instance: EmailsInputAPI;
    let divContainer: HTMLDivElement;
    let countValidEmailsBtn: HTMLElement;
    beforeEach(() => {
      sandbox(`<button id="count-valid-emails-btn" />`);
      divContainer = document.querySelector('#emails-input');
      instance = EmailsInput(divContainer);
      countValidEmailsBtn = document.getElementById('count-valid-emails-btn');
    });
    it('when click on external btn should get list of all emails, validate each, and return count of valid', done => {
      // arrange
      const initialEmails = [
        'valid@email.com',
        'invalid',
        'also@valid.email',
        'nope',
      ];
      instance.setEmails(initialEmails);
      // set click handler: getEmails, find valid ones, return count of valid
      const btnClickHandler = () => {
        const emails: string[] = instance.getEmails();
        const validEmails = emails.filter(email =>
          instance.isEmailValid(email)
        );
        // assert
        expect(validEmails.length).toEqual(2);
        done();
      };
      // attach handler
      countValidEmailsBtn.addEventListener('click', btnClickHandler);
      // act
      countValidEmailsBtn.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
      // assert - check it in btnClickHandler
    });
  });
});
