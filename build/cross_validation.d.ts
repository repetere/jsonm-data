/**
 * Split arrays into random train and test subsets
 * @memberOf cross_validation
 * @example
 * const testArray = [20, 25, 10, 33, 50, 42, 19, 34, 90, 23, ];
// { train: [ 50, 20, 34, 33, 10, 23, 90, 42 ], test: [ 25, 19 ] }
const trainTestSplit = ms.cross_validation.train_test_split(testArray,{ test_size:0.2, random_state: 0, });
 * @param {array} dataset - array of data to split
 * @param {object} options
 * @param {number} [options.test_size=0.2] - represent the proportion of the dataset to include in the test split, can be overwritten by the train_size
 * @param {number} [options.train_size=0.8] - represent the proportion of the dataset to include in the train split
 * @param {number} [options.random_state=0] - the seed used by the random number generator
 * @param {boolean} [options.return_array=false] - will return an object {train,test} of the split dataset by default or [train,test] if returned as an array
 * @returns {(Object|array)} returns training and test arrays either as an object or arrays
 */
declare function train_test_split(dataset?: never[], options?: {
    test_size: number;
    train_size: number;
    random_state: number;
    return_array: boolean;
    parse_int_train_size: boolean;
}): any[][] | {
    train: any[];
    test: never[];
};
/**
 * Provides train/test indices to split data in train/test sets. Split dataset into k consecutive folds.
Each fold is then used once as a validation while the k - 1 remaining folds form the training set.
 * @memberOf cross_validation
 * @example
 * const testArray = [20, 25, 10, 33, 50, 42, 19, 34, 90, 23, ];
// [ [ 50, 20, 34, 33, 10 ], [ 23, 90, 42, 19, 25 ] ]
const crossValidationArrayKFolds = ms.cross_validation.cross_validation_split(testArray, { folds: 2, random_state: 0, });
 * @param {array} dataset - array of data to split
 * @param {object} options
 * @param {number} [options.folds=3] - Number of folds
 * @param {number} [options.random_state=0] - the seed used by the random number generator
 * @returns {array} returns  dataset split into k consecutive folds
 */
declare function cross_validation_split(dataset?: never[], options?: {
    folds: number;
    random_state: number;
}): any[][];
/**
 * Used to test variance and bias of a prediction
 * @memberOf cross_validation
 * @param {object} options
 * @param {function} options.classifier - instance of classification model used for training, or function to train a model. e.g. new DecisionTreeClassifier({ gainFunction: 'gini', }) or ml.KNN
 * @param {function} options.regression - instance of regression model used for training, or function to train a model. e.g. new RandomForestRegression({ nEstimators: 300, }) or ml.MultivariateLinearRegression
 * @return {number[]} Array of accucracy calculations
 */
declare function cross_validate_score(options?: {}): any[];
/**
 * Used to test variance and bias of a prediction with parameter tuning
 * @memberOf cross_validation
 * @param {object} options
 * @param {function} options.classifier - instance of classification model used for training, or function to train a model. e.g. new DecisionTreeClassifier({ gainFunction: 'gini', }) or ml.KNN
 * @param {function} options.regression - instance of regression model used for training, or function to train a model. e.g. new RandomForestRegression({ nEstimators: 300, }) or ml.MultivariateLinearRegression
 * @return {number[]} Array of accucracy calculations
 */
declare function grid_search(options?: {}): any;
/**
 * @see {@link https://machinelearningmastery.com/implement-resampling-methods-scratch-python/}
 */
export declare const cross_validation: {
    train_test_split: typeof train_test_split;
    cross_validation_split: typeof cross_validation_split;
    kfolds: typeof cross_validation_split;
    cross_validate_score: typeof cross_validate_score;
    grid_search: typeof grid_search;
    GridSearch: any;
};
export {};
