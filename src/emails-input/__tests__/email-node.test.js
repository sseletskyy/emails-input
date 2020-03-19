import { EmailNode } from '../email-node';
import { EMAIL_DELETED } from '../emails-input';
const sandbox = () => {
  document.body.innerHTML = `
<div id="sandbox"></div>
`;
};
const VALID_EMAIL = 'mike@miro.com';
const INVALID_EMAIL = 'invalid@';
const EMAIL_ENDING_WITH_NO_COMMA = 'email@with.comma';
const EMAIL_ENDING_WITH_COMMA = EMAIL_ENDING_WITH_NO_COMMA + ',';

describe('EmailNode', () => {
  beforeEach(() => {
    sandbox();
  });
  it('should exist', () => {
    expect(EmailNode).toBeTruthy();
  });
  describe('function should implement the following API', () => {
    describe('create', () => {
      it('expects string as an argument', () => {
        expect(() => {
          // noinspection JSCheckFunctionSignatures
			EmailNode.create(123);
        }).toThrowError(
          new Error('EmailNode : create method expects a string as an argument')
        );
      });
      describe('when email is valid', () => {
        it('should return a div element with respective css class', () => {
          const div = EmailNode.create(VALID_EMAIL);
          const classList = Array.from(div.classList);
          expect(classList).toEqual(
            expect.arrayContaining(['email', 'email--state-valid'])
          );
        });
      });
      describe('when email is INVALID', () => {
        it('should return a div element with respective css class', () => {
          const div = EmailNode.create(INVALID_EMAIL);
          const classList = Array.from(div.classList);
          expect(classList).toEqual(
            expect.arrayContaining(['email', 'email--state-invalid'])
          );
        });
      });
      describe('when email ends with comma', () => {
        it('should remove comma in final email text', () => {
          const div = EmailNode.create(EMAIL_ENDING_WITH_COMMA);
          const textBeforeSpanTag = div.innerHTML.split('<')[0];
          expect(textBeforeSpanTag).toEqual(EMAIL_ENDING_WITH_NO_COMMA);
        });
      });
    });
    describe('delete', () => {
      describe('when clicked on cross character', () => {
        it('custom event should be dispatched', () => {
          // arrange
          const div = EmailNode.create(VALID_EMAIL);
          const sandbox = document.getElementById('sandbox');
          sandbox.appendChild(div);
          const onDelete = jest.fn();
          sandbox.addEventListener(EMAIL_DELETED, onDelete);
          // act
          // simulate click on the span element with a cross character
          div.querySelector('span').dispatchEvent(new MouseEvent('click'));
          // assert
          expect(onDelete).toBeCalled();
        });
      });
    });
  });
});
