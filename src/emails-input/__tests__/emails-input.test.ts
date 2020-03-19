import { EmailsInput, EmailsInputAPI, INPUT_COMPLETED } from '../emails-input';
import { getChildren } from '../test-helper';

const sandbox = () => {
  document.body.innerHTML = `
<div id="emails-input"></div>
`;
};
const VALID_EMAIL = 'mike@miro.com';
const INVALID_EMAIL = 'invalid@';

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
      const children = Array.from(divContainer.children);
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
            'input.email'
          );
          inputNode.value = VALID_EMAIL;
          // simulate the final completion event initiated from [enter], [comma] or out of focus
          const customEvent = new CustomEvent(INPUT_COMPLETED, {
            bubbles: true,
          });

          // act
          inputNode.focus();
          inputNode.dispatchEvent(customEvent);

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
            'input.email'
          );
          inputNode.value = emailWithComma;
          // simulate the final completion event initiated from [enter], [comma] or out of focus
          const customEvent = new CustomEvent(INPUT_COMPLETED, {
            bubbles: true,
          });

          // act
          inputNode.dispatchEvent(customEvent);

          // assert
          children = getChildren(divContainer);
          expect(children.length).toEqual(2);
          // check no comma
          const textBeforeSpanTag = children[0].innerHTML.split('<')[0];
          expect(textBeforeSpanTag).toEqual(emailWithoutComma);
        });
      });
      describe('email node should NOT be created with the custom event is dispatched', () => {
        it('if input is empty', () => {
          // arrange
          let children = getChildren(divContainer);
          expect(children.length).toEqual(1);
          // find input node
          const inputNode: HTMLInputElement = document.querySelector(
            'input.email'
          );
          inputNode.value = '';
          // simulate the final completion event initiated from [enter], [comma] or out of focus
          const customEvent = new CustomEvent(INPUT_COMPLETED, {
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
            'input.email'
          );
          inputNode.value = ',';
          // simulate the final completion event initiated from [enter], [comma] or out of focus
          const customEvent = new CustomEvent(INPUT_COMPLETED, {
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
            'input.email'
          );
          inputNode.value = ',,,,';
          // simulate the final completion event initiated from [enter], [comma] or out of focus
          const customEvent = new CustomEvent(INPUT_COMPLETED, {
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
        const children = Array.from(divContainer.children);
        expect(children[0].innerHTML).toContain(VALID_EMAIL);
        checkNodeIsAnInput(children[1]);
      });
      it('should replace current emails with provided array (check several items)', () => {
        instance.setEmails([VALID_EMAIL, INVALID_EMAIL]);
        const children = Array.from(divContainer.children);
        expect(children[0].innerHTML).toContain(VALID_EMAIL);
        expect(children[1].innerHTML).toContain(INVALID_EMAIL);
      });
      it('should keep an input node at the end', () => {
        instance.setEmails([VALID_EMAIL, INVALID_EMAIL]);
        const children = Array.from(divContainer.children);
        checkNodeIsAnInput(children[2]);
      });
    });
  });
});
