import natural from './stub';
const eVString = 'I would rate everything Great, views Great, food Great';
const { tokenizeAndStem } = natural.PorterStemmer;
describe('stub', function () { 
  describe('natural', () => {
    describe('PorterStemmer', () => {
      it('should return an object', () => {
        expect(typeof natural).toBe('object');
        expect(typeof natural.PorterStemmer).toBe('object');
        expect(natural.PorterStemmer).toHaveProperty('tokenizeAndStem');
      });
    });
    describe('tokenizeAndStem', () => {
      it('should return an array of string stems', () => {
        expect(natural.PorterStemmer.tokenizeAndStem).toBeInstanceOf(Function);
        const stems = tokenizeAndStem(eVString);
        expect(stems).toContain('great');
        expect(stems).toContain('view');
        expect(stems).toBeInstanceOf(Array);
      });
    });
   
  });
});