import * as ModelXData from './index';
import chai from 'chai';
const expect = chai.expect;
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
        expect(ModelXData.util.forecastErrors).to.be.a('function');
        expect(ModelXData.util.forecastErrors(actuals, estimates)).to.eql([4, -5, 2, -3,]);
      });
      it('should throw an error if array lengths are not the same', () => {
        expect(ModelXData.util.forecastErrors.bind({},[1,2,3],[1,2,3,4])).to.throw(/must equal/);
      });
    });
    describe('meanForecastError', () => {
      it('should return bias of forecast accuracy', () => {
        expect(ModelXData.util.meanForecastError).to.be.a('function');
        expect(ModelXData.util.MFE).to.eql(ModelXData.util.meanForecastError);
        expect(ModelXData.util.meanForecastError(actuals, estimates)).to.eql(-0.5);
      });
    });
    describe('meanAbsoluteDeviation', () => {
      it('should return absolute size of the errors', () => {
        expect(ModelXData.util.meanAbsoluteDeviation).to.be.a('function');
        expect(ModelXData.util.MAD).to.eql(ModelXData.util.meanAbsoluteDeviation);
        expect(ModelXData.util.meanAbsoluteDeviation(actuals, estimates)).to.eql(3.5);
      });
    });
    describe('trackingSignal', () => {
      it('should return tracking Signal', () => {
        expect(ModelXData.util.trackingSignal).to.be.a('function');
        expect(ModelXData.util.TS).to.eql(ModelXData.util.trackingSignal);
        const TSig = ModelXData.util.trackingSignal(actuals, estimates);
        expect(TSig.toFixed(2)).to.eql('-0.57');
      });
    });
    describe('meanSquaredError', () => {
      it('should return MSE', () => {
        expect(ModelXData.util.meanSquaredError).to.be.a('function');
        expect(ModelXData.util.MSE).to.eql(ModelXData.util.meanSquaredError);
        expect(ModelXData.util.meanSquaredError(actuals, estimates)).to.eql(13.5);
      });
    });
    describe('MADMeanRatio', () => {
      it('should return MMR', () => {
        expect(ModelXData.util.MADMeanRatio).to.be.a('function');
        expect(ModelXData.util.MMR).to.eql(ModelXData.util.MADMeanRatio);
        const MMR = ModelXData.util.MADMeanRatio(actuals, estimates);
        expect(MMR.toFixed(2)).to.eql('0.08');
      });
    });
    describe('meanAbsolutePercentageError', () => {
      it('should return MAPE', () => {
        expect(ModelXData.util.meanAbsolutePercentageError).to.be.a('function');
        expect(ModelXData.util.MAPE).to.eql(ModelXData.util.meanAbsolutePercentageError);
        const MAPE = ModelXData.util.meanAbsolutePercentageError(actuals, estimates);
        expect(MAPE.toFixed(2)).to.eql('0.09');
      });
    });
  });
  describe('max', () => {
    it('should return max value', () => {
      expect(ModelXData.util).to.be.an('object');
      expect(ModelXData.util.max(testArray)).to.equal(50);   
    });
  });
  describe('min', () => {
    it('should return min value', () => {
      expect(ModelXData.util.min(testArray)).to.equal(10);   
    });
  });
  describe('mean', () => {
    it('should return mean value', () => {
      expect(ModelXData.util.mean(testArray)).to.equal(ModelXData.util.sum(testArray) / testArray.length);   
    });
  });
  describe('Standard Scaler Transforms', () => { 
    const standardScaledTestArray = ModelXData.util.StandardScaler(testArray);
    const standardScaledTransformsTestObj = ModelXData.util.StandardScalerTransforms(testArray);
    it('should return an object with a scale function, descale function and values array', () => {
      expect(standardScaledTransformsTestObj).to.be.an('object');
      expect(standardScaledTransformsTestObj).to.have.property('scale');
      expect(standardScaledTransformsTestObj).to.have.property('descale');
      expect(standardScaledTransformsTestObj).to.have.property('values');
      expect(standardScaledTransformsTestObj.scale).to.be.a('function');
      expect(standardScaledTransformsTestObj.descale).to.be.a('function');
      expect(standardScaledTransformsTestObj.values).to.be.an('array');
    });
    it('should have a values array that is equal to the array produced by StandardScaler function', () => {
      expect(standardScaledTransformsTestObj.values).to.eql(standardScaledTestArray);
    });
    it('should have a values array that is equal to the array produced by StandardScaler function', () => {
      expect(standardScaledTransformsTestObj.values).to.eql(standardScaledTestArray);
    });
    it('should properly scale single values', () => {
      expect(standardScaledTransformsTestObj.scale(testArray[0])).to.equal(standardScaledTestArray[0]);
      expect(standardScaledTransformsTestObj.scale(testArray[1])).to.equal(standardScaledTestArray[1]);
    });
    it('should properly descale single values', () => {
      expect(standardScaledTransformsTestObj.descale(standardScaledTestArray[0])).to.equal(testArray[0]);
      expect(standardScaledTransformsTestObj.descale(standardScaledTestArray[1])).to.equal(testArray[1]);
    });
  });
  describe('MinMax Scaler Transforms', () => { 
    const minMaxScaledTestArray = ModelXData.util.MinMaxScaler(testArray);
    const minMaxScaledTransformsTestObj = ModelXData.util.MinMaxScalerTransforms(testArray);
    it('should return an object with a scale function, descale function and values array', () => {
      expect(minMaxScaledTransformsTestObj).to.be.an('object');
      expect(minMaxScaledTransformsTestObj).to.have.property('scale');
      expect(minMaxScaledTransformsTestObj).to.have.property('descale');
      expect(minMaxScaledTransformsTestObj).to.have.property('values');
      expect(minMaxScaledTransformsTestObj.scale).to.be.a('function');
      expect(minMaxScaledTransformsTestObj.descale).to.be.a('function');
      expect(minMaxScaledTransformsTestObj.values).to.be.an('array');
      expect(minMaxScaledTransformsTestObj.values).to.eql(minMaxScaledTestArray);
    });
    it('should have a values array that is equal to the array produced by MinMaxScaler function', () => {
      expect(minMaxScaledTransformsTestObj.values).to.eql(minMaxScaledTestArray);
    });
    it('should properly scale single values', () => {
      expect(minMaxScaledTransformsTestObj.scale(testArray[0])).to.equal(minMaxScaledTestArray[0]);
      expect(minMaxScaledTransformsTestObj.scale(testArray[1])).to.equal(minMaxScaledTestArray[1]);
    });
    it('should properly descale single values', () => {
      expect(minMaxScaledTransformsTestObj.descale(minMaxScaledTestArray[0])).to.equal(testArray[0]);
      expect(minMaxScaledTransformsTestObj.descale(minMaxScaledTestArray[1])).to.equal(testArray[1]);
    });
  });
  describe('Log Scaler', () => { 
    it('should return log scaled values', () => {
      const logScaledTestArray = ModelXData.util.LogScaler(testArray);
      expect(logScaledTestArray[ 0 ]).to.equal(Math.log(testArray[ 0 ]));
      expect(logScaledTestArray[ 3 ]).to.equal(Math.log(testArray[ 3 ]));
    });
  });
  describe('Exponent Scaler', () => {
    it('should return exponent scaled values', () => {
      const expScaledTestArray = ModelXData.util.ExpScaler(testArray);
      expect(expScaledTestArray[ 0 ]).to.equal(Math.exp(testArray[ 0 ]));
      expect(expScaledTestArray[ 3 ]).to.equal(Math.exp(testArray[ 3 ]));
    });
  });
  describe('Standard Error of the Estimate', () => {
    const actuals = [2, 4, 5, 4, 5, ];
    const estimates = [2.8, 3.4, 4, 4.6, 5.2, ];
    it('should return the Standard Error of the Estimate', () => {
      const SE = ModelXData.util.standardError(actuals, estimates);
      expect(SE.toFixed(2)).to.eql(0.89.toString());
    });
    it('should return an error if array lengths are not the same', () => {
      try {
        ModelXData.util.standardError(actuals, [2, ]);
      } catch (e) {
        expect(e).to.be.an('error');
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
      expect(sanitizedNames).to.eql(ranSanitized);
      // console.log({ sanitizedNames });
    });
  });
  describe('Coefficient of correlation', () => {
    const actuals = [39, 42, 67, 76,];
    const estimates = [44, 40, 60, 84,];
    it('should return the Coefficient of correlation', () => {
      const R = ModelXData.util.coefficientOfCorrelation(actuals, estimates);
      expect(R.toFixed(4)).to.eql(0.9408.toString());

    });
    it('should return an error if array lengths are not the same', () => {
      try {
        ModelXData.util.coefficientOfCorrelation(actuals, [2, ]);
      } catch (e) {
        expect(e).to.be.an('error');
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
      expect(Math.pow(R, 2)).to.eql(rSquared);
      expect(rSquared.toFixed(1)).to.eql(COD.toFixed(1));
    });
  });
  describe('Coefficient of determination', () => {
    const actuals = [2, 4, 5, 4, 5, ];
    const estimates = [2.8, 3.4, 4, 4.6, 5.2, ];
    it('should return the Coefficient of determination', () => {
      const r2 = ModelXData.util.coefficientOfDetermination(actuals, estimates);
      expect(r2.toFixed(1)).to.eql(0.6.toString());
    });
    it('should return an error if array lengths are not the same', () => {
      try {
        ModelXData.util.coefficientOfDetermination(actuals, [2, ]);
      } catch (e) {
        expect(e).to.be.an('error');
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
      expect(adjr2.toFixed(3)).to.eql(0.922.toString());
    });
  });
  describe('pivotVector', () => {
    it('should pivot vectors into arrays', () => {
      const arrays = ModelXData.util.pivotVector(vectors); // => [ [1,2,3,3], [2,2,3,3], [3,3,4,3] ];
      expect(arrays[ 0 ]).to.be.lengthOf(4);
      expect(arrays[ 0 ]).to.eql([1, 1, 3, 3,]);
      expect(arrays[ 1 ]).to.be.lengthOf(4);
      expect(arrays[ 1 ]).to.eql([2, 2, 3, 3,]);
      expect(arrays[ 2 ]).to.be.lengthOf(4);
      expect(arrays[ 2 ]).to.eql([3, 3, 4, 3,]);
    });
  });
  describe('pivotArrays', () => {
    it('should pivot arrays into vectors', () => {
      const translatedVectors = ModelXData.util.pivotArrays(arrays);
      expect(translatedVectors).to.eql(vectors);
    });
  });
  describe('Z Scores / Standard Scores', () => {
    it('should calculate standard scores', () => {
      const observations = [
        7, 8, 8, 7.5, 9,
      ];
      const zscores = ModelXData.util.standardScore(observations);
      const roundedZScores = zscores.map(z => parseFloat(z.toFixed(2), 10));
      expect(roundedZScores[ 3 ]).to.eql(-0.54);
      // console.log({ zscores,roundedZScores });
    });
    it('should approximate the p-value from the z score', () => { 
      const z1 = 2.87;
      const z2 = 1.96;
      const p1 = parseFloat(ModelXData.util.approximateZPercentile(z1).toFixed(3), 10);
      const p2 = parseFloat(ModelXData.util.approximateZPercentile(z2).toFixed(3), 10);
      const p3 = parseFloat(ModelXData.util.approximateZPercentile(z1, false).toFixed(3), 10);
      const p4 = parseFloat(ModelXData.util.approximateZPercentile(z2, false).toFixed(3), 10);
      expect(p1).to.eql(0.002);
      expect(p3).to.eql(0.998);
      expect(p2).to.eql(0.025);
      expect(p4).to.eql(0.975);
      expect(ModelXData.util.approximateZPercentile(-10)).to.eql(0);
      expect(ModelXData.util.approximateZPercentile(10)).to.eql(1);
      // console.log('ModelXData.util.approximateZPercentile(-10)', ModelXData.util.approximateZPercentile(-10));
    });
  });
});