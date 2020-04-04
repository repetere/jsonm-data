import stemmer from 'stemmer';
const natural = {
    PorterStemmer: {
        tokenizeAndStem: (input = '') => {
            return stemmer(input).split(' ');
        }
    }
};
export default natural;
