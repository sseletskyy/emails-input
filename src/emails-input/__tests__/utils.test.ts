import { parsePastedText } from '../utils';

describe('parsePastedText', () => {
  describe('when single email is provided', () => {
    it('should trim spaces', () => {
      const actual = parsePastedText(' some@email.com  ');
      const expected = ['some@email.com'];
      expect(actual).toEqual(expected);
    });
  });
  describe('when multiple comma-separated emails are provided', () => {
    it('should return as an array and trim spaces', () => {
      const actual = parsePastedText(
        ' some@email.com, other@email.com , incorrect , last@one ,  '
      );
      const expected = [
        'some@email.com',
        'other@email.com',
        'incorrect',
        'last@one',
      ];
      expect(actual).toEqual(expected);
    });
  });
  describe('when provided a name and email with angle brackets', () => {
    it('should return only email inside of angle brackets', () => {
      const actual = parsePastedText('Foo Bar <foobar@host.domain> ');
      const expected = ['foobar@host.domain'];
      expect(actual).toEqual(expected);
    });
  });
  describe('when provided multiple names and emails with angle brackets (comma separated)', () => {
    it('should return only email inside of angle brackets', () => {
      const actual = parsePastedText(
        'Foo Bar <foobar@host.domain> , Max Paine < max@pain.com > , <  > '
      );
      const expected = ['foobar@host.domain', 'max@pain.com'];
      expect(actual).toEqual(expected);
    });
  });
  describe('when provided text is empty', () => {
  	it('should return an empty array', () => {
  		expect(parsePastedText('   ')).toEqual([]);
	})
  })
});
