import * as ModelXData from './index';
const testArray = [20, 25, 10, 33, 50, 42, 19, ];
const vectors = [
  [1, 2, 3,],
  [1, 2, 3,],
  [3, 3, 4,],
  [3, 3, 3,],
];
const arrays = [
  [1, 1, 3, 3, ],
  [2, 2, 3, 3, ],
  [3, 3, 4, 3, ],
];

describe('util', function () { 
  describe('forecasting metrics', () => {
    const actuals = [45, 38, 43, 39,];
    const estimates = [41, 43, 41, 42,];
    const actuals2 = [120, 90, 101, 91, 115, 83,];
    const estimates2 = [100, 106, 102, 101, 98, 103,];
    describe('forecastErrors', () => {
      it('should return array of residuals', () => {
        expect(typeof ModelXData.util.forecastErrors).toBe('function');
        expect(ModelXData.util.forecastErrors(actuals, estimates)).toEqual([4, -5, 2, -3,]);
      });
      it('should throw an error if array lengths are not the same', () => {
        expect(ModelXData.util.forecastErrors.bind({},[1,2,3],[1,2,3,4])).toThrowError(/must equal/);
      });
    });
    describe('meanForecastError', () => {
      it('should return bias of forecast accuracy', () => {
        expect(typeof ModelXData.util.meanForecastError).toBe('function');
        expect(ModelXData.util.MFE).toEqual(ModelXData.util.meanForecastError);
        expect(ModelXData.util.meanForecastError(actuals, estimates)).toEqual(-0.5);
      });
    });
    describe('meanAbsoluteDeviation', () => {
      it('should return absolute size of the errors', () => {
        expect(typeof ModelXData.util.meanAbsoluteDeviation).toBe('function');
        expect(ModelXData.util.MAD).toEqual(ModelXData.util.meanAbsoluteDeviation);
        expect(ModelXData.util.meanAbsoluteDeviation(actuals, estimates)).toEqual(3.5);
      });
    });
    describe('trackingSignal', () => {
      it('should return tracking Signal', () => {
        expect(typeof ModelXData.util.trackingSignal).toBe('function');
        expect(ModelXData.util.TS).toEqual(ModelXData.util.trackingSignal);
        const TSig = ModelXData.util.trackingSignal(actuals, estimates);
        expect(TSig.toFixed(2)).toEqual('-0.57');
      });
    });
    describe('meanSquaredError', () => {
      it('should return MSE', () => {
        expect(typeof ModelXData.util.meanSquaredError).toBe('function');
        expect(ModelXData.util.MSE).toEqual(ModelXData.util.meanSquaredError);
        expect(ModelXData.util.meanSquaredError(actuals, estimates)).toEqual(13.5);
      });
    });
    describe('MADMeanRatio', () => {
      it('should return MMR', () => {
        expect(typeof ModelXData.util.MADMeanRatio).toBe('function');
        expect(ModelXData.util.MMR).toEqual(ModelXData.util.MADMeanRatio);
        const MMR = ModelXData.util.MADMeanRatio(actuals, estimates);
        expect(MMR.toFixed(2)).toEqual('0.08');
      });
    });
    describe('meanAbsolutePercentageError', () => {
      it('should return MAPE', () => {
        expect(typeof ModelXData.util.meanAbsolutePercentageError).toBe('function');
        expect(ModelXData.util.MAPE).toEqual(ModelXData.util.meanAbsolutePercentageError);
        const MAPE = ModelXData.util.meanAbsolutePercentageError(actuals, estimates);
        expect(MAPE.toFixed(2)).toEqual('0.09');
      });
    });
  });
  describe('max', () => {
    it('should return max value', () => {
      expect(typeof ModelXData.util).toBe('object');
      // console.log({ testArray });
      expect(ModelXData.util.max(testArray)).toBe(50);   
    });
  });
  describe('min', () => {
    it('should return min value', () => {
      expect(ModelXData.util.min(testArray)).toBe(10);   
    });
  });
  describe('mean', () => {
    it('should return mean value', () => {
      expect(ModelXData.util.mean(testArray)).toBe(ModelXData.util.sum(testArray) / testArray.length);   
    });
  });
  describe('Standard Scaler Transforms', () => { 
    const standardScaledTestArray = ModelXData.util.StandardScaler(testArray);
    const standardScaledTransformsTestObj = ModelXData.util.StandardScalerTransforms(testArray);
    it('should return an object with a scale function, descale function and values array', () => {
      expect(typeof standardScaledTransformsTestObj).toBe('object');
      expect(standardScaledTransformsTestObj).toHaveProperty('scale');
      expect(standardScaledTransformsTestObj).toHaveProperty('descale');
      expect(standardScaledTransformsTestObj).toHaveProperty('values');
      expect(typeof standardScaledTransformsTestObj.scale).toBe('function');
      expect(typeof standardScaledTransformsTestObj.descale).toBe('function');
      expect(standardScaledTransformsTestObj.values).toBeInstanceOf(Array);
    });
    it('should have a values array that is equal to the array produced by StandardScaler function', () => {
      expect(standardScaledTransformsTestObj.values).toEqual(standardScaledTestArray);
    });
    it('should have a values array that is equal to the array produced by StandardScaler function', () => {
      expect(standardScaledTransformsTestObj.values).toEqual(standardScaledTestArray);
    });
    it('should properly scale single values', () => {
      expect(standardScaledTransformsTestObj.scale(testArray[0])).toBe(standardScaledTestArray[0]);
      expect(standardScaledTransformsTestObj.scale(testArray[1])).toBe(standardScaledTestArray[1]);
    });
    it('should properly descale single values', () => {
      expect(standardScaledTransformsTestObj.descale(standardScaledTestArray[0])).toBe(testArray[0]);
      expect(standardScaledTransformsTestObj.descale(standardScaledTestArray[1])).toBe(testArray[1]);
    });
  });
  describe('MinMax Scaler Transforms', () => { 
    const minMaxScaledTestArray = ModelXData.util.MinMaxScaler(testArray);
    const minMaxScaledTransformsTestObj = ModelXData.util.MinMaxScalerTransforms(testArray);
    it('should return an object with a scale function, descale function and values array', () => {
      expect(typeof minMaxScaledTransformsTestObj).toBe('object');
      expect(minMaxScaledTransformsTestObj).toHaveProperty('scale');
      expect(minMaxScaledTransformsTestObj).toHaveProperty('descale');
      expect(minMaxScaledTransformsTestObj).toHaveProperty('values');
      expect(typeof minMaxScaledTransformsTestObj.scale).toBe('function');
      expect(typeof minMaxScaledTransformsTestObj.descale).toBe('function');
      expect(minMaxScaledTransformsTestObj.values).toBeInstanceOf(Array);
      expect(minMaxScaledTransformsTestObj.values).toEqual(minMaxScaledTestArray);
    });
    it('should have a values array that is equal to the array produced by MinMaxScaler function', () => {
      expect(minMaxScaledTransformsTestObj.values).toEqual(minMaxScaledTestArray);
    });
    it('should properly scale single values', () => {
      expect(minMaxScaledTransformsTestObj.scale(testArray[0])).toBe(minMaxScaledTestArray[0]);
      expect(minMaxScaledTransformsTestObj.scale(testArray[1])).toBe(minMaxScaledTestArray[1]);
    });
    it('should properly descale single values', () => {
      expect(minMaxScaledTransformsTestObj.descale(minMaxScaledTestArray[0])).toBe(testArray[0]);
      expect(minMaxScaledTransformsTestObj.descale(minMaxScaledTestArray[1])).toBe(testArray[1]);
    });
  });
  describe('Log Scaler', () => { 
    it('should return log scaled values', () => {
      const logScaledTestArray = ModelXData.util.LogScaler(testArray);
      expect(logScaledTestArray[ 0 ]).toBe(Math.log(testArray[ 0 ]));
      expect(logScaledTestArray[ 3 ]).toBe(Math.log(testArray[ 3 ]));
    });
  });
  describe('Exponent Scaler', () => {
    it('should return exponent scaled values', () => {
      const expScaledTestArray = ModelXData.util.ExpScaler(testArray);
      expect(expScaledTestArray[ 0 ]).toBe(Math.exp(testArray[ 0 ]));
      expect(expScaledTestArray[ 3 ]).toBe(Math.exp(testArray[ 3 ]));
    });
  });
  describe('Standard Error of the Estimate', () => {
    const actuals = [2, 4, 5, 4, 5, ];
    const estimates = [2.8, 3.4, 4, 4.6, 5.2, ];
    it('should return the Standard Error of the Estimate', () => {
      const SE = ModelXData.util.standardError(actuals, estimates);
      expect(SE.toFixed(2)).toEqual((0.89).toString());
    });
    it('should return an error if array lengths are not the same', () => {
      try {
        ModelXData.util.standardError(actuals, [2, ]);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
  describe('getSafePropertyName', () => {
    it('should sanitize property names', () => {
      const names = [
        'sa les',
        'sa.les',
        'sa.les!!!',
        'Sa.les!!!',
        'Sa.leS',
        'Sa---leS',
        'Sa---l#eS',
      ];
      const sanitizedNames = names.map(ModelXData.util.getSafePropertyName);
      const ranSanitized = ['sa les',
        'sa_les',
        'sa_les___',
        'Sa_les___',
        'Sa_leS',
        'Sa___leS',
        'Sa___l_eS',
      ];
      expect(sanitizedNames).toEqual(ranSanitized);
      // console.log({ sanitizedNames });
    });
  });
  describe('Coefficient of correlation', () => {
    const actuals = [39, 42, 67, 76,];
    const estimates = [44, 40, 60, 84,];
    it('should return the Coefficient of correlation', () => {
      const R = ModelXData.util.coefficientOfCorrelation(actuals, estimates);
      expect(R.toFixed(4)).toEqual((0.9408).toString());

    });
    it('should return an error if array lengths are not the same', () => {
      try {
        ModelXData.util.coefficientOfCorrelation(actuals, [2, ]);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
  describe('rSquared', () => {
    const actuals = [39, 42, 67, 76,];
    const estimates = [44, 40, 60, 84,];
    it('should return r^2', () => {
      const R = ModelXData.util.coefficientOfCorrelation(actuals, estimates);
      const rSquared = ModelXData.util.rSquared(actuals, estimates);
      const COD = ModelXData.util.coefficientOfDetermination(actuals, estimates);
      expect(Math.pow(R, 2)).toEqual(rSquared);
      expect(rSquared.toFixed(1)).toEqual(COD.toFixed(1));
    });
  });
  describe('Coefficient of determination', () => {
    const actuals = [2, 4, 5, 4, 5, ];
    const estimates = [2.8, 3.4, 4, 4.6, 5.2, ];
    it('should return the Coefficient of determination', () => {
      const r2 = ModelXData.util.coefficientOfDetermination(actuals, estimates);
      expect(r2.toFixed(1)).toEqual((0.6).toString());
    });
    it('should return an error if array lengths are not the same', () => {
      try {
        ModelXData.util.coefficientOfDetermination(actuals, [2, ]);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
  describe('adjusted coefficient of determination', () => {
    it('should return the adjusted Coefficient of determination', () => {
      const adjr2 = ModelXData.util.adjustedCoefficentOfDetermination({
        rSquared: 0.944346527,
        sampleSize: 8,
        independentVariables: 2,
      }); 
      expect(adjr2.toFixed(3)).toEqual((0.922).toString());
    });
  });
  describe('pivotVector', () => {
    it('should pivot vectors into arrays', () => {
      const arrays = ModelXData.util.pivotVector(vectors); // => [ [1,2,3,3], [2,2,3,3], [3,3,4,3] ];
      expect(arrays[ 0 ]).toHaveLength(4);
      expect(arrays[ 0 ]).toEqual([1, 1, 3, 3,]);
      expect(arrays[ 1 ]).toHaveLength(4);
      expect(arrays[ 1 ]).toEqual([2, 2, 3, 3,]);
      expect(arrays[ 2 ]).toHaveLength(4);
      expect(arrays[ 2 ]).toEqual([3, 3, 4, 3,]);
    });
  });
  describe('pivotArrays', () => {
    it('should pivot arrays into vectors', () => {
      const translatedVectors = ModelXData.util.pivotArrays(arrays);
      expect(translatedVectors).toEqual(vectors);
    });
  });
  describe('Z Scores / Standard Scores', () => {
    it('should calculate standard scores', () => {
      const observations = [
        7, 8, 8, 7.5, 9,
      ];
      const zscores = ModelXData.util.standardScore(observations);
      const roundedZScores = zscores.map(z => parseFloat(z.toFixed(2), 10));
      expect(roundedZScores[ 3 ]).toEqual(-0.54);
      // console.log({ zscores,roundedZScores });
    });
    it('should approximate the p-value from the z score', () => { 
      const z1 = 2.87;
      const z2 = 1.96;
      const p1 = parseFloat(ModelXData.util.approximateZPercentile(z1).toFixed(3), 10);
      const p2 = parseFloat(ModelXData.util.approximateZPercentile(z2).toFixed(3), 10);
      const p3 = parseFloat(ModelXData.util.approximateZPercentile(z1, false).toFixed(3), 10);
      const p4 = parseFloat(ModelXData.util.approximateZPercentile(z2, false).toFixed(3), 10);
      expect(p1).toEqual(0.002);
      expect(p3).toEqual(0.998);
      expect(p2).toEqual(0.025);
      expect(p4).toEqual(0.975);
      expect(ModelXData.util.approximateZPercentile(-10)).toEqual(0);
      expect(ModelXData.util.approximateZPercentile(10)).toEqual(1);
      // console.log('ModelXData.util.approximateZPercentile(-10)', ModelXData.util.approximateZPercentile(-10));
    });
  });
});