import * as ModelXData from './index';
const rawTransactions = [
  ['Cookies', 'Milk', 'Plates', ],
  ['Cups', 'Milk', 'Silverware', ],
  ['Cookies', 'Cups', 'Milk', 'Silverware', ],
  ['Cups', 'Silverware', ],
  ['Cookies', 'Cups', 'Milk', 'Silverware', ],
];

// if (!Object.values) {
//   ObjectValues.shim();
// }
describe('calc', function () { 
  describe('getTransactions', () => {
    const gt = ModelXData.calc.getTransactions(rawTransactions);
    // console.log(gt);
    it('should return values', () => {
      expect(gt).toHaveProperty('values');
      expect(gt.values).toBeInstanceOf(Set);
    });
    it('should contain all unique values of all transactions', () => {
      expect(Array.from(gt.values.values())).toEqual(expect.arrayContaining([
        'Cookies', 'Milk', 'Plates', 'Cups', 'Silverware',
      ]));
    });
    it('should have a map of all unique values and indexes', () => {
      expect(gt.valuesMap).toBeInstanceOf(Map);
      gt.values.forEach((val, i) => {
        expect(gt.valuesMap.has(val.toString())).toBe(true);
        expect(gt.valuesMap.get(val.toString())).toEqual(gt.valuesMap.get(i.toString()));
        expect(gt.valuesMap.has(i.toString())).toBe(true);
        expect(gt.valuesMap.get(i.toString())).toEqual(gt.valuesMap.get(val.toString()));
      });
    });
    it('should map values onto transactions', () => {
      expect(gt.transactions.length).toEqual(rawTransactions.length);
      rawTransactions.forEach((rt, i) => {
        expect(rt.length).toEqual(gt.transactions[ i ].length);
      });
    });
  });
  describe('assocationRuleLearning', () => {
    const gt = ModelXData.calc.getTransactions(rawTransactions);
    it('should use Eclat to associate transactions', (done) => {
      // if (process.platform === 'darwin') {
      ModelXData.calc.assocationRuleLearning(gt.transactions, {
        valuesMap: gt.valuesMap,
      })
        .then(arl => {
          // console.log('arl',arl);
          expect(arl).toBeInstanceOf(Array);
          done();
        })
        .catch(done);
      expect(typeof ModelXData.calc.assocationRuleLearning).toBe('function');
      // }
    });
    it('should use accept options for eclat summary', (done) => {
      // if (process.platform === 'darwin') {
      ModelXData.calc.assocationRuleLearning(gt.transactions, {
        valuesMap: gt.valuesMap,
        summary: false,
      })
        .then(arl => {
          // console.log({ arl });
          expect(arl).toBeInstanceOf(Array);
          done();
        })
        .catch(done);
      // }
    });
    it('should work with raw transactions', (done) => {
      // if (process.platform === 'darwin') {
      ModelXData.calc.assocationRuleLearning(rawTransactions, {
        summary: false,
      })
        .then(arl => {
          expect(arl).toBeInstanceOf(Array);
          done();
        })
        .catch(done);
      // }
    });
    it('should handle errors', (done) => {
      ModelXData.calc.assocationRuleLearning(NaN, {
        summary: NaN,
        support: NaN,
        minLength: NaN,
        valuesMap: NaN,
      })
        .then((r) => {
          console.log('r', r)
          done(new Error('should not get to then'))
        })
        .catch(e => {
          expect(e).toBeInstanceOf(Error);
          done();
        });
    });
  });
});