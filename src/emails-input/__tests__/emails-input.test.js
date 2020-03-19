require('../emails-input');
const sandbox = () => {
  document.body.innerHTML = `
<div id="emails-input"></div>
`;
};
const VALID_EMAIL = 'mike@miro.com';
// const INVALID_EMAIL = 'invalid@';
describe('EmailsInput', () => {
  beforeEach(() => {
    sandbox();
  });
  it('should be available', () => {
    expect(EmailsInput).toBeTruthy();
  });
  describe('instance should implement the following API', () => {
    let instance, divContainer;
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
      });
    });
  });
});
