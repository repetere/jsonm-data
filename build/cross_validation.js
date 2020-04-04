import { MersenneTwister19937, integer, } from 'random-js';
import { default as range, } from 'lodash.range';
import { Matrix, } from 'ml-matrix';
import { default as ConfusionMatrix, } from 'ml-confusion-matrix';
import { util, } from './util';
import { DataSet, } from './DataSet';
import { default as jgsl, } from 'js-grid-search-lite';
const { GridSearch, } = jgsl;
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
function train_test_split(dataset = [], options = {
    test_size: 0.2,
    train_size: 0.8,
    random_state: 0,
    return_array: false,
    parse_int_train_size: true,
}) {
    const engine = MersenneTwister19937.seed(options.random_state || 0);
    const training_set = [];
    const parse_int_train_size = (typeof options.parse_int_train_size === 'boolean') ? options.parse_int_train_size : true;
    const train_size_length = (options.train_size)
        ? options.train_size * dataset.length
        : (1 - (options.test_size || 0.2)) * dataset.length;
    const train_size = parse_int_train_size
        ? parseInt(train_size_length, 10)
        : train_size_length;
    const dataset_copy = [].concat(dataset);
    while (training_set.length < train_size) {
        const index = integer(0, (dataset_copy.length - 1))(engine);
        // console.log({ index });
        training_set.push(dataset_copy.splice(index, 1)[0]);
    }
    return (options.return_array) ? [training_set, dataset_copy,] : {
        train: training_set,
        test: dataset_copy,
    };
}
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
function cross_validation_split(dataset = [], options = {
    folds: 3,
    random_state: 0,
}) {
    const engine = MersenneTwister19937.seed(options.random_state || 0);
    const folds = options.folds || 3;
    const dataset_split = [];
    const dataset_copy = [].concat(dataset);
    const foldsize = parseInt(dataset.length / (folds || 3), 10);
    for (let i in range(folds)) {
        const fold = [];
        while (fold.length < foldsize) {
            const index = integer(0, (dataset_copy.length - 1))(engine);
            fold.push(dataset_copy.splice(index, 1)[0]);
        }
        dataset_split.push(fold);
    }
    return dataset_split;
}
/**
 * Used to test variance and bias of a prediction
 * @memberOf cross_validation
 * @param {object} options
 * @param {function} options.classifier - instance of classification model used for training, or function to train a model. e.g. new DecisionTreeClassifier({ gainFunction: 'gini', }) or ml.KNN
 * @param {function} options.regression - instance of regression model used for training, or function to train a model. e.g. new RandomForestRegression({ nEstimators: 300, }) or ml.MultivariateLinearRegression
 * @return {number[]} Array of accucracy calculations
 */
function cross_validate_score(options = {}) {
    const config = Object.assign({}, {
        // classifier,
        // regression,
        // dataset,
        // testingset,
        dependentFeatures: [['X',],],
        independentFeatures: [['Y',],],
        // random_state,
        folds: 10,
        accuracy: 'standardError',
        use_train_x_matrix: true,
        use_train_y_matrix: false,
        use_train_y_vector: false,
        use_estimates_y_vector: false,
    }, options);
    const classifier = config.classifier;
    const regression = config.regression;
    const folds = cross_validation_split(config.dataset, {
        folds: config.folds,
        random_state: config.random_state,
    });
    const testingDataSet = new DataSet(config.testingset);
    const y_test_matrix = testingDataSet.columnMatrix(config.independentFeatures);
    const x_test_matrix = testingDataSet.columnMatrix(config.dependentFeatures);
    const actuals = util.pivotVector(y_test_matrix)[0];
    // console.log({ actuals });
    const prediction_accuracies = folds.map(fold => {
        const trainingDataSet = new DataSet(fold);
        const x_train = trainingDataSet.columnMatrix(config.dependentFeatures);
        const y_train = trainingDataSet.columnMatrix(config.independentFeatures);
        const x_train_matrix = (config.use_train_x_matrix)
            ? new Matrix(x_train)
            : x_train;
        const y_train_matrix = (config.use_train_y_matrix)
            ? new Matrix(y_train)
            : (config.use_train_y_vector)
                ? util.pivotVector(y_train)[0]
                : y_train;
        if (regression) {
            let regressor;
            let pred_y_test;
            if (typeof regression.train === 'function') {
                regressor = regression.train(x_train_matrix, y_train_matrix, config.modelOptions);
                pred_y_test = regression.predict(x_test_matrix);
            }
            else {
                regressor = new regression(x_train_matrix, y_train_matrix, config.modelOptions);
                pred_y_test = regressor.predict(x_test_matrix);
            }
            // console.log({ x_test_matrix });
            // console.log({ pred_y_test });
            const estimates = pred_y_test; //util.pivotVector(pred_y_test)[0];
            // console.log({ estimates, actuals });
            return (config.accuracy === 'standardError')
                ? util.standardError(actuals, estimates)
                : util.rSquared(actuals, estimates);
        }
        else {
            let classification;
            let estimates;
            if (typeof classifier.train === 'function') {
                classifier.train(x_train_matrix, y_train_matrix, config.modelOptions);
                estimates = classifier.predict(x_test_matrix);
            }
            else {
                classification = new classifier(x_train_matrix, y_train_matrix, config.modelOptions);
                estimates = classification.predict(x_test_matrix);
            }
            // classification.train(x_train_matrix, y_train_matrix);
            // classifier.train(x_train_matrix, y_train_matrix);
            const compareEstimates = (config.use_estimates_y_vector)
                ? util.pivotVector(estimates)[0]
                : estimates;
            const CM = ConfusionMatrix.fromLabels(actuals, compareEstimates);
            return CM.getAccuracy();
        }
    });
    return prediction_accuracies;
}
/**
 * Used to test variance and bias of a prediction with parameter tuning
 * @memberOf cross_validation
 * @param {object} options
 * @param {function} options.classifier - instance of classification model used for training, or function to train a model. e.g. new DecisionTreeClassifier({ gainFunction: 'gini', }) or ml.KNN
 * @param {function} options.regression - instance of regression model used for training, or function to train a model. e.g. new RandomForestRegression({ nEstimators: 300, }) or ml.MultivariateLinearRegression
 * @return {number[]} Array of accucracy calculations
 */
function grid_search(options = {}) {
    const config = Object.assign({}, {
        return_parameters: false,
        compare_score: 'mean',
        sortAccuracyScore: 'desc',
        parameters: {},
    }, options);
    const regressor = config.regression;
    const classification = config.classifier;
    const sortAccuracyScore = (!options.sortAccuracyScore && config.regression)
        ? 'asc'
        : config.sortAccuracyScore;
    // const scoreSorter = ;
    const gs = new GridSearch({
        params: config.parameters,
        run_callback: (params) => {
            if (config.regression) {
                config.regression = new regressor(params);
            }
            else {
                config.classifier = new classification(params);
            }
            const score = cross_validate_score(config);
            return (config.compare_score)
                ? util[config.compare_score](score)
                : score;
        },
    });
    gs.run();
    const accuracySorter = (sortAccuracyScore === 'desc')
        ? (a, b) => b.results - a.results
        : (a, b) => a.results - b.results;
    const results = gs._results.sort(accuracySorter);
    // GridSearch;
    return config.return_parameters
        ? results
        : results[0];
}
/**
 * @namespace
 * @see {@link https://machinelearningmastery.com/implement-resampling-methods-scratch-python/}
 */
export const cross_validation = {
    train_test_split,
    cross_validation_split,
    kfolds: cross_validation_split,
    cross_validate_score,
    grid_search,
    GridSearch,
};
