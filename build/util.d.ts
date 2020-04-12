import { Matrix } from './DataSet';
export interface ArrayCalculation {
    (numbers: number[]): number;
}
export interface ArraySort {
    (num: number[]): any;
}
/**
 * Returns an array of the squared different of two arrays
 * @memberOf util
 * @param {Number[]} left
 * @param {Number[]} right
 * @returns {Number[]} Squared difference of left minus right array
 */
declare function squaredDifference(left: number[], right: number[]): number[];
/**
 * The standard error of the estimate is a measure of the accuracy of predictions made with a regression line. Compares the estimate to the actual value
 * @memberOf util
 * @see {@link http://onlinestatbook.com/2/regression/accuracy.html}
 * @example
  const actuals = [ 2, 4, 5, 4, 5, ];
  const estimates = [ 2.8, 3.4, 4, 4.6, 5.2, ];
  const SE = ms.util.standardError(actuals, estimates);
  SE.toFixed(2) // => 0.89
 * @param {Number[]} actuals - numerical samples
 * @param {Number[]} estimates - estimates values
 * @returns {Number} Standard Error of the Estimate
 */
declare function standardError(actuals?: number[], estimates?: number[]): number;
/**
 * Calculates the z score of each value in the sample, relative to the sample mean and standard deviation.
 * @memberOf util
 * @see {@link https://docs.scipy.org/doc/scipy-0.14.0/reference/generated/scipy.stats.mstats.zscore.html}
 * @param {Number[]} observations - An array like object containing the sample data.
 * @returns {Number[]} The z-scores, standardized by mean and standard deviation of input array
 */
declare function standardScore(observations?: number[]): number[];
/**
 * In statistics, the coefficient of determination, denoted R2 or r2 and pronounced "R squared", is the proportion of the variance in the dependent variable that is predictable from the independent variable(s). Compares distance of estimated values to the mean.
 * {\bar {y}}={\frac {1}{n}}\sum _{i=1}^{n}y_{i}
 * @example
const actuals = [ 2, 4, 5, 4, 5, ];
const estimates = [ 2.8, 3.4, 4, 4.6, 5.2, ];
const r2 = ms.util.coefficientOfDetermination(actuals, estimates);
r2.toFixed(1) // => 0.6
 * @memberOf util
 * @see {@link https://en.wikipedia.org/wiki/Coefficient_of_determination} {@link http://statisticsbyjim.com/regression/standard-error-regression-vs-r-squared/}
 * @param {Number[]} actuals - numerical samples
 * @param {Number[]} estimates - estimates values
 * @returns {Number} r^2
 */
declare function coefficientOfDetermination(actuals?: number[], estimates?: number[]): number;
/**
 * You can use the adjusted coefficient of determination to determine how well a multiple regression equation “fits” the sample data. The adjusted coefficient of determination is closely related to the coefficient of determination (also known as R2) that you use to test the results of a simple regression equation.
 * @example
const adjr2 = ms.util.adjustedCoefficentOfDetermination({
  rSquared: 0.944346527,
  sampleSize: 8,
  independentVariables: 2,
});
r2.toFixed(3) // => 0.922
 * @memberOf util
 * @see {@link http://www.dummies.com/education/math/business-statistics/how-to-calculate-the-adjusted-coefficient-of-determination/}
 * @param {Object} [options={}]
 * @param {Number[]} [options.actuals] - numerical samples
 * @param {Number[]} [options.estimates] - estimate values
 * @param {Number} [options.rSquared] - coefficent of determination
 * @param {Number} [options.sampleSize] - the sample size
 * @param {Number} options.independentVariables - the number of independent variables in the regression equation
 * @returns {Number} adjusted r^2 for multiple linear regression
 */
declare function adjustedCoefficentOfDetermination(options: {
    actuals: number[];
    estimates: number[];
    rSquared: number;
    independentVariables: number;
    sampleSize: number;
}): number;
/**
 * The coefficent of Correlation is given by R decides how well the given data fits a line or a curve.
 * @example
const actuals = [ 39, 42, 67, 76, ];
const estimates = [ 44, 40, 60, 84, ];
const R = ms.util.coefficientOfCorrelation(actuals, estimates);
R.toFixed(4) // => 0.9408
 * @memberOf util
 * @see {@link https://calculator.tutorvista.com/r-squared-calculator.html}
 * @param {Number[]} actuals - numerical samples
 * @param {Number[]} estimates - estimates values
 * @returns {Number} R
 */
declare function coefficientOfCorrelation(actuals?: number[], estimates?: number[]): number;
/**
 * The coefficent of determination is given by r^2 decides how well the given data fits a line or a curve.
 *
 * @param {Number[]} [actuals=[]]
 * @param {Number[]}  [estimates=[]]
 * @returns {Number} r^2
 */
declare function rSquared(actuals?: number[], estimates?: number[]): number;
/**
 * returns an array of vectors as an array of arrays
 * @example
const vectors = [ [1,2,3], [1,2,3], [3,3,4], [3,3,3] ];
const arrays = pivotVector(vectors); // => [ [1,2,3,3], [2,2,3,3], [3,3,4,3] ];
 * @memberOf util
 * @param {Array[]} vectors
 * @returns {Array[]}
 */
declare function pivotVector(vectors?: Array<any>[]): Matrix;
/**
 * returns a matrix of values by combining arrays into a matrix
 * @memberOf util
 * @example
  const arrays = [
    [ 1, 1, 3, 3 ],
    [ 2, 2, 3, 3 ],
    [ 3, 3, 4, 3 ],
  ];
  pivotArrays(arrays); //=>
  // [
  //   [1, 2, 3,],
  //   [1, 2, 3,],
  //   [3, 3, 4,],
  //   [3, 3, 3,],
  // ];
  * @param {Array} [vectors=[]] - array of arguments for columnArray to merge columns into a matrix
  * @returns {Array} a matrix of column values
  */
declare function pivotArrays(arrays?: Matrix): Matrix;
export declare type InputComponents = {
    average?: number;
    standard_dev?: number;
    maximum?: number;
    minimum?: number;
};
export declare type ScaledTransforms = {
    components: InputComponents;
    scale: (x: number) => number;
    descale: (x: number) => number;
    values: number[];
};
/** This function returns two functions that can standard scale new inputs and reverse scale new outputs
 * @param {Number[]} values - array of numbers
 * @returns {Object} - {scale[ Function ], descale[ Function ]}
*/
declare function StandardScalerTransforms(vector?: never[], nan_value?: number, return_nan?: boolean, inputComponents?: InputComponents): ScaledTransforms;
/** This function returns two functions that can mix max scale new inputs and reverse scale new outputs
 * @param {Number[]} values - array of numbers
 * @returns {Object} - {scale[ Function ], descale[ Function ]}
*/
declare function MinMaxScalerTransforms(vector?: never[], nan_value?: number, return_nan?: boolean, inputComponents?: InputComponents): ScaledTransforms;
/**
  * Converts z-score into the probability
  * @memberOf util
  * @see {@link https://stackoverflow.com/questions/36575743/how-do-i-convert-probability-into-z-score}
  * @param {number} z - Number of standard deviations from the mean.
  * @returns {number} p  - p-value
  */
declare function approximateZPercentile(z: number, alpha?: boolean): number;
/**
 * returns a safe column name / url slug from a string
 * @param {String} name
 * @returns {String}
 */
declare function getSafePropertyName(name: string): string;
/**
 * The errors (residuals) from acutals and estimates
 * @memberOf util
 * @example
  const actuals = [ 45, 38, 43, 39 ];
  const estimates = [ 41, 43, 41, 42 ];
  const errors = ms.util.forecastErrors(actuals, estimates); // => [ 4, -5, 2, -3 ]
 * @param {Number[]} actuals - numerical samples
 * @param {Number[]} estimates - estimates values
 * @returns {Number[]} errors (residuals)
 */
declare function forecastErrors(actuals: number[], estimates: number[]): number[];
/**
 * The bias of forecast accuracy
 * @memberOf util
 * @see {@link https://scm.ncsu.edu/scm-articles/article/measuring-forecast-accuracy-approaches-to-forecasting-a-tutorial}
 * @example
  const actuals = [ 45, 38, 43, 39 ];
  const estimates = [ 41, 43, 41, 42 ];
  const MFE = ms.util.meanForecastError(actuals, estimates); // =>  -0.5
 * @param {Number[]} actuals - numerical samples
 * @param {Number[]} estimates - estimates values
 * @returns {Number} MFE (bias)
 */
declare function meanForecastError(actuals: number[], estimates: number[]): number;
/**
 * Mean Absolute Deviation (MAD) indicates the absolute size of the errors
 * @memberOf util
 * @see {@link https://scm.ncsu.edu/scm-articles/article/measuring-forecast-accuracy-approaches-to-forecasting-a-tutorial}
 * @example
  const actuals = [ 45, 38, 43, 39 ];
  const estimates = [ 41, 43, 41, 42 ];
  const MAD = ms.util.meanAbsoluteDeviation(actuals, estimates); // =>  3.5
 * @param {Number[]} actuals - numerical samples
 * @param {Number[]} estimates - estimates values
 * @returns {Number} MAD
 */
declare function meanAbsoluteDeviation(actuals: number[], estimates: number[]): number;
/**
 * Tracking Signal - Used to pinpoint forecasting models that need adjustment
 * @memberOf util
 * @see {@link https://scm.ncsu.edu/scm-articles/article/measuring-forecast-accuracy-approaches-to-forecasting-a-tutorial}
 * @example
  const actuals = [ 45, 38, 43, 39 ];
  const estimates = [ 41, 43, 41, 42 ];
  const trackingSignal = ms.util.trackingSignal(actuals, estimates);
  trackingSignal.toFixed(2) // =>  -0.57
 * @param {Number[]} actuals - numerical samples
 * @param {Number[]} estimates - estimates values
 * @returns {Number} trackingSignal
 */
declare function trackingSignal(actuals: number[], estimates: number[]): number;
/**
 * The standard error of the estimate is a measure of the accuracy of predictions made with a regression line. Compares the estimate to the actual value
 * @memberOf util
 * @see {@link http://onlinestatbook.com/2/regression/accuracy.html}
 * @example
  const actuals = [ 45, 38, 43, 39 ];
  const estimates = [ 41, 43, 41, 42 ];
  const MSE = ms.util.meanSquaredError(actuals, estimates); // => 13.5
 * @param {Number[]} actuals - numerical samples
 * @param {Number[]} estimates - estimates values
 * @returns {Number} MSE
 */
declare function meanSquaredError(actuals: number[], estimates: number[]): number;
/**
 * MAD over Mean Ratio - The MAD/Mean ratio is an alternative to the MAPE that is better suited to intermittent and low-volume data. As stated previously, percentage errors cannot be calculated when the actual equals zero and can take on extreme values when dealing with low-volume data. These issues become magnified when you start to average MAPEs over multiple time series. The MAD/Mean ratio tries to overcome this problem by dividing the MAD by the Mean—essentially rescaling the error to make it comparable across time series of varying scales
 * @memberOf util
 * @see {@link https://www.forecastpro.com/Trends/forecasting101August2011.html}
 * @example
  const actuals = [ 45, 38, 43, 39 ];
  const estimates = [ 41, 43, 41, 42 ];
  const MMR = ms.util.MADMeanRatio(actuals, estimates);
  MAPE.toFixed(2) // => 0.08
 * @param {Number[]} actuals - numerical samples
 * @param {Number[]} estimates - estimates values
 * @returns {Number} MMR
 */
declare function MADMeanRatio(actuals: number[], estimates: number[]): number;
/**
 * MAPE (Mean Absolute Percent Error) measures the size of the error in percentage terms
 * @memberOf util
 * @see {@link https://www.forecastpro.com/Trends/forecasting101August2011.html}
 * @example
  const actuals = [ 45, 38, 43, 39 ];
  const estimates = [ 41, 43, 41, 42 ];
  const MAPE = ms.util.meanAbsolutePercentageError(actuals, estimates);
  MAPE.toFixed(2) // => 0.86
 * @param {Number[]} actuals - numerical samples
 * @param {Number[]} estimates - estimates values
 * @returns {Number} MAPE
 */
declare function meanAbsolutePercentageError(actuals: number[], estimates: number[]): number;
/**
 * @namespace
 */
export declare const util: {
    range: {
        (start: number, end?: number | undefined, step?: number | undefined): number[];
        (end: number, index: string | number, guard: object): number[];
    };
    rangeRight: {
        (start: number, end?: number | undefined, step?: number | undefined): number[];
        (end: number, index: string | number, guard: object): number[];
    };
    scale: (a: number[], d: number) => number[];
    avg: ArrayCalculation;
    mean: ArrayCalculation;
    sum: ArrayCalculation;
    max: ArraySort;
    min: ArraySort;
    sd: ArrayCalculation;
    StandardScaler: (z: number[]) => number[];
    StandardScalerTransforms: typeof StandardScalerTransforms;
    MinMaxScaler: (z: number[]) => number[];
    MinMaxScalerTransforms: typeof MinMaxScalerTransforms;
    LogScaler: (z: number[]) => number[];
    ExpScaler: (z: number[]) => number[];
    squaredDifference: typeof squaredDifference;
    standardError: typeof standardError;
    coefficientOfDetermination: typeof coefficientOfDetermination;
    coefficientOfCorrelation: typeof coefficientOfCorrelation;
    r: typeof coefficientOfCorrelation;
    rSquared: typeof rSquared;
    adjustedCoefficentOfDetermination: typeof adjustedCoefficentOfDetermination;
    rBarSquared: typeof adjustedCoefficentOfDetermination;
    adjustedRSquared: typeof adjustedCoefficentOfDetermination;
    pivotVector: typeof pivotVector;
    pivotArrays: typeof pivotArrays;
    standardScore: typeof standardScore;
    zScore: typeof standardScore;
    approximateZPercentile: typeof approximateZPercentile;
    getSafePropertyName: typeof getSafePropertyName;
    forecastErrors: typeof forecastErrors;
    meanForecastError: typeof meanForecastError;
    MFE: typeof meanForecastError;
    meanAbsoluteDeviation: typeof meanAbsoluteDeviation;
    MAD: typeof meanAbsoluteDeviation;
    trackingSignal: typeof trackingSignal;
    TS: typeof trackingSignal;
    meanSquaredError: typeof meanSquaredError;
    MSE: typeof meanSquaredError;
    MADMeanRatio: typeof MADMeanRatio;
    MMR: typeof MADMeanRatio;
    meanAbsolutePercentageError: typeof meanAbsolutePercentageError;
    MAPE: typeof meanAbsolutePercentageError;
};
export {};
