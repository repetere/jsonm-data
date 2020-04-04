import stemmer from 'stemmer';
const natural = {
  PorterStemmer: {
    tokenizeAndStem: (input: string = '')=> {
      return stemmer(input).split(' ');
    }
  }
};
export default natural;