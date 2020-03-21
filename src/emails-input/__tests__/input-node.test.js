import { InputNode } from '../input-node';
const sandbox = () => {
  document.body.innerHTML = `
<div id="sandbox"></div>
`;
};
// const VALID_EMAIL = 'mike@miro.com';
// const INVALID_EMAIL = 'invalid@';

describe('InputNode', () => {
  beforeEach(() => {
    sandbox();
  });
  it('should exist', () => {
    expect(InputNode).toBeTruthy();
  });
  describe('function should implement the following API', () => {
    describe('create', () => {
      it('does not expect any arguments (ignores them)', () => {
        // noinspection JSCheckFunctionSignatures
        expect(() => InputNode.create(123)).not.toThrow();
      });
      it('should return an input element with respective css class', () => {
        const input = InputNode.create();
        const classList = Array.from(input.classList);
        expect(classList).toEqual(expect.arrayContaining(['input']));
      });
      it('should return an input element with a placeholder', () => {
        const input = InputNode.create();
        expect(input.getAttribute('placeholder')).toEqual('add more people...');
      });
    });
  });
});
