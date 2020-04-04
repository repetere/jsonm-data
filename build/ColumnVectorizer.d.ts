/**
 * class creating sparse matrices from a corpus
 * @class ColumnVectorizer
 * @memberOf nlp
 */
export declare class ColumnVectorizer {
    /**
     * creates a new instance for classifying text data for machine learning
     * @example
     * const dataset = new ms.nlp.ColumnVectorizer(csvData);
     * @param {Object} [options={}]
     * @prop {Object[]} this.data - Array of strings
     * @prop {Set} this.tokens - Unique collection of all tokenized strings
     * @prop {Object[]} this.vectors - Array of tokenized words with value of count of appreance in string
     * @prop {Object} this.wordMap - Object of all unique words, with value of 0
     * @prop {Object} this.wordCountMap - Object of all unique words, with value as total count of appearances
     * @prop {number} this.maxFeatures - max number of features
     * @prop {String[]} this.sortedWordCount - list of words as tokens sorted by total appearances
     * @prop {String[]} this.limitedFeatures - subset list of maxFeatures words as tokens sorted by total appearances
     * @prop {Array[]} this.matrix - words in sparse matrix
     * @prop {Function} this.replacer - clean string function
     * @returns {this}
     */
    constructor(options?: {});
    /**
     * Returns a distinct array of all tokens
     * @return {String[]} returns a distinct array of all tokens
    */
    get_tokens(): unknown[];
    /**
     * Returns array of arrays of strings for dependent features from sparse matrix word map
     * @return {String[]} returns array of dependent features for DataSet column matrics
    */
    get_vector_array(): unknown[][];
    /**
     * Fits and transforms data by creating column vectors (a sparse matrix where each row has every word in the corpus as a column and the count of appearances in the corpus)
     * @param {Object} options
     * @param {Object[]} options.data - array of corpus data
     */
    fit_transform(options?: {}): any;
    /**
     * Returns limited sets of dependent features or all dependent features sorted by word count
     * @param {*} options
     * @param {number} options.maxFeatures - max number of features
     */
    get_limited_features(options?: {}): any;
    /**
     * returns word map with counts
     * @example
  ColumnVectorizer.evaluateString('I would rate everything Great, views Great, food Great') => { realli: 0,
       good: 0,
       definit: 0,
       recommend: 0,
       wait: 0,
       staff: 0,
       rude: 0,
       great: 3,
       view: 1,
       food: 1,
       not: 0,
       cold: 0,
       took: 0,
       forev: 0,
       seat: 0,
       time: 0,
       prompt: 0,
       attent: 0,
       bland: 0,
       flavor: 0,
       kind: 0 }
     * @param {String} testString
     * @return {Object} object of corpus words with accounts
     */
    evaluateString(testString?: string): any;
    /**
     * returns new matrix of words with counts in columns
     * @example
  ColumnVectorizer.evaluate('I would rate everything Great, views Great, food Great') => [ [ 0, 1, 3, 0, 0, 0, 0, 0, 1 ] ]
     * @param {String} testString
     * @return {number[][]} sparse matrix row for new classification predictions
     */
    evaluate(testString: string | undefined, options: any): any;
}
