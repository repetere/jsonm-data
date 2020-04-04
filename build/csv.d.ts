/**
 * Asynchronously loads a CSV from a remote URL and returns an array of objects
 * @example
 * // returns [{header:value,header2:value2}]
 * loadCSVURI('https://raw.githubusercontent.com/repetere/modelscript/master/test/mock/data.csv').then(csvData).catch(console.error)
 * @memberOf csv
 * @param {string} filepath - URL to CSV path
 * @param {Object} [options] - options passed to csvtojson
 * @returns {Object[]} returns an array of objects from a csv where each column header is the property name
 */
export declare function loadCSVURI(filepath: any, options: any): Promise<unknown>;
/**
 * Asynchronously loads a CSV from either a filepath or remote URL and returns an array of objects
 * @example
 * // returns [{header:value,header2:value2}]
 * loadCSV('../mock/invalid-file.csv').then(csvData).catch(console.error)
 * @memberOf csv
 * @param {string} filepath - URL to CSV path
 * @param {Object} [options] - options passed to csvtojson
 * @returns {Object[]} returns an array of objects from a csv where each column header is the property name
 */
export declare function loadCSV(filepath: any, options: any): Promise<unknown>;
/**
 * Asynchronously loads a TSV from either a filepath or remote URL and returns an array of objects
 * @example
 * // returns [{header:value,header2:value2}]
 * loadCSV('../mock/invalid-file.tsv').then(csvData).catch(console.error)
 * @memberOf csv
 * @param {string} filepath - URL to CSV path
 * @param {Object} [options] - options passed to csvtojson
 * @returns {Object[]} returns an array of objects from a csv where each column header is the property name
 */
export declare function loadTSV(filepath: any, options: any): Promise<unknown>;
