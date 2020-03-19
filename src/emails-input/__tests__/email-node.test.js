import { EmailNode } from '../email-node';
const sandbox = () => {
  document.body.innerHTML = `
<div id="sandbox"></div>
`;
};
const VALID_EMAIL = 'mike@miro.com';
const INVALID_EMAIL = 'invalid@';

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
    });
  });
});
