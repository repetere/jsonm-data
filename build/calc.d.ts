/**
 * Formats an array of transactions into a sparse matrix like format for Apriori/Eclat
 * @see {@link https://github.com/alexisfacques/Node-FPGrowth}
 * @param {Array} data - CSV data of transactions
 * @param {Object} options
 * @param {Boolean} [options.exludeEmptyTranscations=true] - exclude empty rows of transactions
 * @returns {Object} {values - unique list of all values, valuesMap - map of values and labels, transactions - formatted sparse array}
 */
export declare function getTransactions(data: any, options: any): {
    values: Set<unknown>;
    valuesMap: Map<any, any>;
    transactions: any;
};
/**
 * returns association rule learning results
 * @see {@link https://github.com/alexisfacques/Node-FPGrowth}
 * @param {Array} transactions - sparse matrix of transactions
 * @param {Object} options
 * @param {Number} [options.support=0.4] - support level
 * @param {Number} [options.minLength=2] - minimum assocation array size
 * @param {Boolean} [options.summary=true] - return summarized results
 * @param {Map} [options.valuesMap=new Map()] - map of values and labels (used for summary results)
 * @returns {Object} Returns the result from Node-FPGrowth or a summary of support and strong associations
 */
export declare function assocationRuleLearning(transactions: never[] | undefined, options: any): Promise<unknown>;
export declare const calc: {
    getTransactions: typeof getTransactions;
    assocationRuleLearning: typeof assocationRuleLearning;
};
