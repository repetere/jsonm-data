import { DataSet, } from './DataSet';
import { util, } from './util';
import { fullData, fullDataDouble, } from '../test/mock/dataset';
const csvData = [{
  'Country': 'Brazil',
  'Age': '44',
  'Salary': '72000',
  'Purchased': 'N',
},
{
  'Country': 'Mexico',
  'Age': '27',
  'Salary': '48000',
  'Purchased': 'Yes',
},
{
  'Country': 'Ghana',
  'Age': '30',
  'Salary': '54000',
  'Purchased': 'No',
},
{
  'Country': 'Mexico',
  'Age': '38',
  'Salary': '61000',
  'Purchased': 'f',
},
{
  'Country': 'Ghana',
  'Age': '40',
  'Salary': '',
  'Purchased': 'Yes',
},
{
  'Country': 'Brazil',
  'Age': '35',
  'Salary': '58000',
  'Purchased': 'Yes',
},
{
  'Country': 'Mexico',
  'Age': '',
  'Salary': '52000',
  'Purchased': 'false',
},
{
  'Country': 'Brazil',
  'Age': '48',
  'Salary': '79000',
  'Purchased': 'Yes',
},
{
  'Country': 'Ghana',
  'Age': '50',
  'Salary': '83000',
  'Purchased': 'No',
},
{
  'Country': 'Brazil',
  'Age': '37',
  'Salary': '67000',
  'Purchased': 'Yes',
},
];
const unmodifiedCSVData = [...csvData,];

describe('preprocessing', function() {
  describe('DataSet class', () => {
    const CSVDataSet = new DataSet(csvData, { debug: false, });
    const CSVFullDataSet = new DataSet(fullData, { debug: false,  });
    const EncodedCSVDataSet = new DataSet(csvData, { debug: false, });
    EncodedCSVDataSet.fitColumns({
      Country:'onehot',
      Salary:'parseNumber',
      Age:['scale', 'standard',],
      Purchased:['label', { binary:true, }, ],
    });

    describe('constructor', () => {
      it('should instantiate a new DataSet Class', () => {
        // expect(ms.preprocessing).to.be.an('object');
        expect(typeof DataSet).toBe('function');
        expect(CSVDataSet).toBeInstanceOf(DataSet);
      });
    });
    describe('static getBinaryValue', () => {
      it('should return 0 or 1 depending on input values', () => {
        const truthy = [' ', true, 1, 100, 'true', 'T', ];
        const falsey = [undefined, null, '', 0, 'N', 'n', 'NO', 'No', 'no', 'False', 'F', 'f', ];
        truthy.forEach(truthVal => {
          expect(DataSet.getBinaryValue(truthVal)).toEqual(1);
        });
        falsey.forEach(falseVal => {
          expect(DataSet.getBinaryValue(falseVal)).toEqual(0);
        });
      });
    });
    describe('static mapToObject', () => {
      const mapToObject = DataSet.mapToObject;
      const testArray = ['some', 'values', 'in', 'array', ];
      const testMap = new Map([
        ['foo', 'bar', ],
        ['hello', testArray, ],
      ]);
      const nestMap = new Map([
        ['nested_string', 'this is nested', ],
        ['nested_array', [1, 2, 3, 4, ], ],
      ]);
      const nestedMap = new Map(testMap);
      nestedMap.set('deep_nest', nestMap);
      it('should convert a map into an equivalent JavaScript Object', () => {
        const convertedMaptoObject = DataSet.mapToObject(testMap);
        const correctObject = { foo: 'bar', hello: ['some', 'values', 'in', 'array', ], };
        // console.log({ convertedMaptoObject, correctObject, });
        expect(JSON.stringify(convertedMaptoObject)).toEqual(JSON.stringify(correctObject));
        expect(convertedMaptoObject.hello).toBeInstanceOf(Array)
        expect(convertedMaptoObject.hello).toMatchObject(testArray);
      });
      it('should convert nested map objects', () => {
        const correctFullyNested = {
          foo: 'bar',
          hello: ['some', 'values', 'in', 'array',],
          deep_nest: {
            nested_string: 'this is nested',
            nested_array: [1, 2, 3, 4,],
          },
        };
        const convertedMaptoObject = mapToObject(nestedMap);
        expect(JSON.stringify(convertedMaptoObject)).toEqual(JSON.stringify(correctFullyNested));
      });
      it('should handle empty maps', () => {
        const emptyConverted = mapToObject(new Map());
        expect(emptyConverted).toEqual({});
      });
    });
    describe('exportFeatures', () => {
      it('should export JavaScript Object of encoders,labels and scalers', () => {
        const expectedFeatures = {
          'encoders': {
            'Country': {
              'name': 'Country',
              'labels': [
                'Brazil',
                'Mexico',
                'Ghana',
              ],
              'prefix': 'Country_',
            },
          },
          'labels': {
            'Purchased': {
              '0': false,
              '1': true,
              'N': 0,
              'Yes': 1,
              'No': 0,
              'f': 0,
              'false': 1,
            },
          },
          'scalers': {
            'Age': {
              'name': 'Age',
              'components': {
                'average': 34.9,
                'standard_dev': 14.24741691988021,
                'maximum': 50,
                'minimum': 0,
              },
              'config': {
                'forced_coercion': false,
                'strategy': 'standard',
              },
            },
          },
        };
        const features = EncodedCSVDataSet.exportFeatures();
        expect(Object.keys(features).length).toEqual(Object.keys(expectedFeatures).length);
      });
    });
    describe('importFeatures', () => { 
      const FeatureDataSet = new DataSet(fullDataDouble);
      FeatureDataSet.fitColumns({
        Country: 'onehot',
        'Sister Country': 'onehot',
        Salary: 'parseNumber',
        Age: ['scale', { strategy: 'standard', forced_coercion: true, },],
        'Scale Age': ['scale', 'standard',],
        'Scale Age Half': ['scale', 'log',],
        Purchased: ['label', { binary: true, },],
        Rating: ['label',],
      });
      const features = FeatureDataSet.exportFeatures();
      it('should import exported Features', () => {
        const newFeatureDataSet = new DataSet();
        newFeatureDataSet.importFeatures(features);
        const transformedObject = newFeatureDataSet.transformObject(fullDataDouble[ 0 ]);
        expect(transformedObject).toEqual(FeatureDataSet.data[ 0 ]);
      });
    });
    describe('filterColumn', () => {
      it('should by default return full dataset', () => {
        expect(CSVDataSet.filterColumn()).toEqual(CSVDataSet.data);
      });
      it('should filter data by a filter function', () => {
        expect(CSVDataSet.filterColumn(row => row.Salary.toString() === '83000')).toHaveLength(1);
      });
    });
    describe('columnMatrix', () => { 
      it('should create a matrix of values from columns', () => {
        const AgeSalMatrix = CSVDataSet.columnMatrix([['Age', ], ['Salary', ], ]);
        const AgeArray = CSVDataSet.columnArray('Age');
        expect(AgeSalMatrix).toHaveLength(AgeArray.length);
        expect(AgeSalMatrix[ 0 ][0]).toEqual(AgeArray[0]);
      });
      it('should create a matrix of values from an array of column names', () => {
        const columns = [
          'Age', 'Salary',
        ];
        const AgeSalMatrix = CSVDataSet.columnMatrix(columns);
        const AgeArray = CSVDataSet.columnArray('Age');
        expect(AgeSalMatrix).toHaveLength(AgeArray.length);
        expect(AgeSalMatrix[ 0 ][0]).toEqual(AgeArray[0]);
      });
      it('should handle invalid columns', () => {
        const invalidMatrix = CSVDataSet.columnMatrix([
          ['iojf',],
        ]);
        expect(invalidMatrix).toBeInstanceOf(Array);
        expect(invalidMatrix[ 0 ][ 0 ]).toBeUndefined();
      });
    });
    describe('static reverseColumnMatrix', () => {
      it('should reverse a matrix of values into labeled object', () => {
        const dependentVariables = [['Age', ], ['Salary', ], ];
        const dependentVariables2 = ['Age', 'Salary',];
        const AgeSalMatrix = CSVDataSet.columnMatrix(dependentVariables);
        const AgeSalMatrix2 = CSVDataSet.columnMatrix(dependentVariables2);
        const AgeArray = CSVDataSet.columnArray('Age');
        const reversedAgeSalMatrix = DataSet.reverseColumnMatrix({ vectors: AgeSalMatrix, labels: dependentVariables, });
        const selectedCols = CSVDataSet.selectColumns(['Age', 'Salary', ]);
        expect(AgeSalMatrix).toHaveLength(AgeArray.length);
        expect(AgeSalMatrix).toEqual(AgeSalMatrix2);
        expect(reversedAgeSalMatrix).toHaveLength(AgeArray.length);
        expect(reversedAgeSalMatrix).toEqual(selectedCols);
      });
    });
    describe('static reverseColumnVector', () => {
      it('should reverse a vector of values into labeled object', () => {
        const dependentVariables = [['Age', ], ['Salary', ], ];
        const dependentVariables2 = ['Age', 'Salary',];
        const AgeArray = CSVDataSet.columnArray('Age');
        const reversedAgeSalVector = DataSet.reverseColumnVector({ vector: AgeArray, labels: dependentVariables, });
        const reversedAgeSalVector2 = DataSet.reverseColumnVector({ vector: AgeArray, labels: dependentVariables2, });
        const selectedCols = CSVDataSet.selectColumns(['Age', ]);
        expect(reversedAgeSalVector).toHaveLength(AgeArray.length);
        expect(reversedAgeSalVector).toEqual(selectedCols);
        expect(reversedAgeSalVector).toEqual(reversedAgeSalVector2);
      });
    });
    describe('selectColumns', () => { 
      it('should return a list of objects with only selected columns as properties', () => {
        const cols = ['Age', 'Salary', ];
        const selectedCols = CSVDataSet.selectColumns(cols);
        expect(Object.keys(selectedCols[ 0 ])).toEqual(cols);
        expect(Object.keys(selectedCols[ 0 ])).toHaveLength(cols.length);
        expect(selectedCols[ 0 ].Age).toEqual(CSVDataSet.data[ 0 ].Age);
        expect(selectedCols[ 0 ].Salary).toEqual(CSVDataSet.data[ 0 ].Salary);
      });
    });
    describe('columnArray', () => {
      const countryColumn = CSVDataSet.columnArray('Country');
      it('should select a column from CSV Data by name', () => {
        expect(countryColumn.length).toBe(10);
        expect(countryColumn[0]).toBe(csvData[0].Country);
      });
      it('should prefilter the dataset', () => {
        const countryColumnPreFiltered = CSVDataSet.columnArray('Country', {
          prefilter: row => row.Country === 'Ghana',
        });
        expect(countryColumnPreFiltered.length).toBe(3);
      });
      it('should filter the dataset', () => {
        const countryColumnPostFiltered = CSVDataSet.columnArray('Country', {
          filter: val => val === 'Brazil',
        });
        expect(countryColumnPostFiltered.length).toBe(4);
      });
      it('should replace values in dataset', () => {
        const countryColumnReplaced = CSVDataSet.columnArray('Country', {
          replace: {
            test: val => val === 'Brazil',
            value: 'China',
          },
        });
        const ageColumnReplacedFuncVal = CSVDataSet.columnArray('Age', {
          replace: {
            test: val => val,
            value: (result, val, index, arr, name) => parseInt(val[name]) * 10,
          },
        });
        expect(ageColumnReplacedFuncVal[0]).toBe(440);
        expect(countryColumnReplaced[0]).toBe('China');
      });
      it('should convert vals to numbers', () => {
        const ageColumnInt = CSVDataSet.columnArray('Age', {
          parseInt: true,
        });
        const ageColumnFloat = CSVDataSet.columnArray('Age', {
          parseFloat: true,
        });
        expect(typeof ageColumnInt[0]).toBe('number');
        expect(typeof ageColumnFloat[0]).toBe('number');
      });
      it('should standardize scale values', () => {
        const salaryColumn = CSVDataSet.columnArray('Salary', {
          prefilter: row => row.Salary,
          parseInt: true,
        });
        const standardScaleSalary = CSVDataSet.columnArray('Salary', {
          prefilter: row => row.Salary,
          scale: 'standard',
        });
        expect(JSON.stringify(standardScaleSalary)).toBe(JSON.stringify(util.StandardScaler(salaryColumn)));
        expect(util.sd(standardScaleSalary)).toBe(1);
        expect(parseInt(Math.round(util.mean(standardScaleSalary)))).toBe(0);
      });
      it('should z-score / MinMax scale values', () => {
        const salaryColumn = CSVDataSet.columnArray('Salary', {
          prefilter: row => row.Salary,
          parseInt: true,
        });
        const minMaxScaleSalary = CSVDataSet.columnArray('Salary', {
          prefilter: row => row.Salary,
          scale: 'minMax',
        });
        // console.log('util.mean(minMaxScaleSalary)', util.mean(minMaxScaleSalary));
        expect(JSON.stringify(minMaxScaleSalary)).toBe(JSON.stringify(util.MinMaxScaler(salaryColumn)));
        expect(parseInt(Math.round(util.sd(minMaxScaleSalary)))).toBeCloseTo(0,1);
        expect(parseInt(Math.round(util.mean(minMaxScaleSalary)))).toBeCloseTo(0,1);
      });
      it('should log scale values', () => {
        const salaryColumn = CSVDataSet.columnArray('Salary', {
          prefilter: row => row.Salary,
          parseInt: true,
        });
        const logScaleSalary = CSVDataSet.columnArray('Salary', {
          prefilter: row => row.Salary,
          scale: 'log',
        });
        expect(JSON.stringify(logScaleSalary)).toBe(JSON.stringify(util.LogScaler(salaryColumn)));
      });
      it('should exp scale values', () => {
        const salaryColumn = CSVDataSet.columnArray('Salary', {
          prefilter: row => row.Salary,
          parseInt: true,
        });
        const logScaleSalary = CSVDataSet.columnArray('Salary', {
          prefilter: row => row.Salary,
          scale: 'exp',
        });
        expect(JSON.stringify(logScaleSalary)).toBe(JSON.stringify(util.ExpScaler(salaryColumn)));
      });
    });
    describe('columnScale / columnDescale', () => {
      const salaryColumn = CSVFullDataSet.columnArray('Salary', { parseInt:true, });
      const salaryColumnScaled = CSVFullDataSet.columnArray('Salary', { scale:'log', });
      const scaledSalaryColumn = CSVFullDataSet.columnScale('Salary', { strategy: 'log', });
      it('should scale a column and store the transform functions', () => {
        expect(CSVFullDataSet.scalers).toBeInstanceOf(Map);
        expect(CSVFullDataSet.scalers.has('Salary')).toBe(true);
        expect(scaledSalaryColumn).toEqual(salaryColumnScaled);
        expect(CSVFullDataSet.scalers.get('Salary').scale(72000)).toEqual(11.184421397998193);
        expect(CSVFullDataSet.scalers.get('Salary').scale(44)).toEqual(3.784189633918261);
      });
      it('should descale a column', () => {
        const descaledColumn = CSVFullDataSet.columnDescale('Salary', { data: scaledSalaryColumn, });
        expect(parseInt(CSVFullDataSet.scalers.get('Salary').descale(11.184421397998193))).toEqual(72000);
        expect(descaledColumn.map(Math.round)).toEqual(salaryColumn);
      });
    });
    describe('labelEncoder', () => {
      const purchasedColumn = CSVDataSet.columnArray('Purchased');
      let encodedPurchased;
      let encodedCountry;
      it('should binary label encode', () => {
        const binaryEncodedColumn = CSVDataSet.labelEncoder('Purchased', {
          data: purchasedColumn,
          binary: true,
        });
        encodedPurchased = binaryEncodedColumn;
        expect(binaryEncodedColumn).toEqual(expect.arrayContaining([0, 1,]));
      });
      it('should label encode', () => {
        const labelEncodedColumn = CSVDataSet.labelEncoder('Country');
        encodedCountry = labelEncodedColumn;
        // console.log({ CSVDataSet }, CSVDataSet.data);
        expect(labelEncodedColumn).toEqual(expect.arrayContaining([0, 1, 2,]));
        labelEncodedColumn.forEach(lec => expect(typeof lec).toBe('number'));
        expect(CSVDataSet.labels.size).toBe(2);
      });
      it('should decode labels', () => {
        const decodedCountry = CSVDataSet.labelDecode('Country', { data: encodedCountry, });
        // console.log({ decodedCountry, encodedCountry });
        expect(typeof decodedCountry[0]).toBe('string');
        expect(decodedCountry[0]).toEqual('Brazil');
        expect(CSVDataSet.labels.get('Country').get(decodedCountry[0])).toBe(encodedCountry[0]);
      });
    });
    describe('getTransforms', () => {
      it('should take column fit options as an array', () => {
        const e = EncodedCSVDataSet.getTransforms({
          Age: ['scale', ],
          Rating: ['label', ],  });
        const e1 = EncodedCSVDataSet.getTransforms({
          Age: 'scale',
          Rating:  'label',  });
        const e2 = EncodedCSVDataSet.getTransforms({
        });
        const e3 = EncodedCSVDataSet.getTransforms({
          Age: ['scale', 'standard',],
          Rating: 'label',
        });
        const fitConf1 = [
          { name: 'Age', options: { strategy: 'scale', }, 
          },
          { name: 'Rating', options: { strategy: 'label', }, 
          },
        ];
        expect(e).toEqual(fitConf1);
        expect(e1).toEqual(fitConf1);
        expect(e2).toEqual([]);
        expect(e3).toEqual([
          {
            name: 'Age',
            options: {
              strategy: 'scale',
              scaleOptions: 'standard',
            },
          }, {
            name: 'Rating',
            options: {
              strategy: 'label',
            },
          },
        ]);
      });
    });
    describe('encodeObject', () => {
      it('should onehot encode an object', () => {
        const labels = ['apple', 'orange', 'banana',];
        const prefix = 'fruit_';
        const name = 'fruit';
        const options = { labels, prefix, name, };
        const data = {
          fruit: 'apple',
        };
        const encodedObject = EncodedCSVDataSet.encodeObject(data, options);
        expect(encodedObject).toEqual({ fruit_apple: 1, fruit_orange: 0, fruit_banana: 0, });
        expect(EncodedCSVDataSet.encodeObject({ fruit:'orange',  }, options)).toEqual({ fruit_apple: 0, fruit_orange: 1, fruit_banana: 0, });
        expect(EncodedCSVDataSet.encodeObject({ fruit:'banana', }, options)).toEqual({ fruit_apple: 0, fruit_orange: 0, fruit_banana: 1, });
        expect(EncodedCSVDataSet.encodeObject({ fruit: 'kiwi', veggie:true, }, options)).toEqual({ fruit_apple: 0, fruit_orange: 0, fruit_banana: 0, });
      });
    });
    describe('transformObject / inverseTransformObject', () => {
      it('should encode new data using existing transforms', () => {
        const transformedObject = EncodedCSVDataSet.transformObject({
          'Country': 'Brazil',
          'Age': '44',
          'Salary': 72000,
          'Purchased': 'N',
        });
        const transformedObject2 = EncodedCSVDataSet.transformObject({
          'Country': 'Brazil',
          'Age': '44',
          'Salary': 72000,
          'Purchased': 'N',
        }, { removeValues: true, });
        expect(transformedObject).toEqual(EncodedCSVDataSet.data[ 0 ]);
        expect(transformedObject2).not.toHaveProperty('Country');
        // console.log({ transformedObject2, });
      });
      it('should inverse transform objects', () => {
        const tranformedObj = {
          Age: 0.6387122698222066,
          Salary: '72000',
          Purchased: 0,
          Country_Brazil: 1,
          Country_Mexico: 0,
          Country_Ghana: 0,
        };
        const inverseTransformedObject = EncodedCSVDataSet.inverseTransformObject(tranformedObj);
        const inverseTransformedObject2 = EncodedCSVDataSet.inverseTransformObject(tranformedObj, { removeValues: true, });

        expect(inverseTransformedObject.Age.toString()).toEqual(csvData[0].Age);
        expect(inverseTransformedObject2.Age.toString()).toEqual(csvData[0].Age);
        expect(inverseTransformedObject.Salary).toEqual(csvData[0].Salary);
        expect(inverseTransformedObject2.Salary).toEqual(csvData[0].Salary);
        expect(inverseTransformedObject2.Purchased).toEqual(Boolean(DataSet.getBinaryValue(csvData[0].Purchased)));
        expect(inverseTransformedObject2.Country).toEqual(csvData[0].Country);
      });
    });
    describe('oneHotDecoder', () => {
      it('should one hot decode', () => {
        const oneHotDecodeCountry = EncodedCSVDataSet.oneHotDecoder('Country');
        const countryColumn = EncodedCSVDataSet.selectColumns(['Country',]);
        expect(oneHotDecodeCountry).toEqual(countryColumn);
      });
    });
    describe('oneHotColumnArray', () => {
      it('should return all encoded columns', () => {
        const selectedColumns = EncodedCSVDataSet.selectColumns(['Country_Brazil', 'Country_Mexico', 'Country_Ghana',]);
        const oneHotArrayed = EncodedCSVDataSet.oneHotColumnArray('Country');
        expect(oneHotArrayed).toEqual(selectedColumns);
      });
    });
    describe('oneHotEncoder', () => {
      it('should one hot encode', () => {
        const oneHotCountry = CSVDataSet.oneHotEncoder('Country');
        expect(Object.keys(oneHotCountry).length).toBe(3);
        expect(oneHotCountry).toHaveProperty('Country_Brazil');
        expect(csvData[0].Country).toBe('Brazil');
        expect(oneHotCountry.Country_Brazil[0]).toEqual(1);
        expect(oneHotCountry.Country_Mexico[0]).toEqual(0);
        expect(oneHotCountry.Country_Ghana[0]).toEqual(0);
        expect(CSVDataSet.encoders.size).toBe(1);
        expect(CSVDataSet.encoders.has('Country')).toBe(true);
      });
    });
    describe('columnReducer', () => { 
      it('should reduce column and greate a new column', () => {
        const reducer = (result, value, index, arr) => {
          result.push(value * 2);
          return result;
        };
        const DoubleAgeColumn = CSVDataSet.columnReducer('DoubleAge', {
          columnName: 'Age',
          reducer,
        });
        const AgeColumn = CSVDataSet.columnArray('Age');
        // console.log({ DoubleAgeColumn, AgeColumn, });
        expect(AgeColumn[ 0 ] * 2).toEqual(DoubleAgeColumn.DoubleAge[ 0 ]);
        expect(DoubleAgeColumn.DoubleAge).toEqual(AgeColumn.reduce(reducer, []));
      });
    });
    describe('columnReplace', () => {
      it('should label encode', () => {
        const leCountry = CSVDataSet.labelEncoder('Country');
        const crCountry = CSVDataSet.columnReplace('Country', {
          strategy: 'label',
        });
        const cr2Country = CSVDataSet.columnReplace('Country', {
          strategy: 'labelEncoder',
        });
        expect(leCountry).toEqual(crCountry);
        expect(leCountry).toEqual(cr2Country);
      });
      it('should onehot encode', () => {
        const ohCountry = CSVDataSet.oneHotEncoder('Country');
        const oh1Country = CSVDataSet.columnReplace('Country', {
          strategy: 'onehot',
        });
        const oh2Country = CSVDataSet.columnReplace('Country', {
          strategy: 'oneHot',
        });
        const oh3Country = CSVDataSet.columnReplace('Country', {
          strategy: 'oneHotEncode',
        });
        const oh4Country = CSVDataSet.columnReplace('Country', {
          strategy: 'oneHotEncoder',
        });
        expect(ohCountry).toEqual(oh1Country);
        expect(ohCountry).toEqual(oh2Country);
        expect(ohCountry).toEqual(oh3Country);
        expect(ohCountry).toEqual(oh4Country);
      });
      it('should replace empty values with mean by default', () => {
        const colSalary = CSVDataSet.columnArray('Salary', {
          parseFloat: true,
          filter: val => val,
        });
        const meanColSalary = CSVDataSet.columnReplace('Salary');
        const meanSal = util.mean(colSalary);
        expect(meanColSalary).toEqual(expect.arrayContaining([meanSal]));
      });
      it('should replace empty values with stat function from ml.js', () => {
        const colSalary = CSVDataSet.columnArray('Salary', {
          parseFloat: true,
          filter: val => val,
        });
        const standardDeviationColSalary = CSVDataSet.columnReplace('Salary', { strategy: 'standardDeviation', });
        const sdSal = util.sd(colSalary);
        expect(standardDeviationColSalary).toEqual(expect.arrayContaining([sdSal]));
      });
      it('should replace values by standard scaling', () => {
        const salaryColumn = CSVDataSet.columnArray('Salary', {
          prefilter: row => row.Salary,
          parseInt: true,
        });
        const salaryMean = util.mean(salaryColumn);
        const formattedSalaryColumn = CSVDataSet.columnArray('Salary', {
          replace: {
            test: val => !val,
            value: salaryMean,
          },
          parseFloat: true,
        });
        const scaledSalaryColumn = util.StandardScaler(formattedSalaryColumn);
        const standardScaleSalary = CSVDataSet.columnReplace('Salary', {
          scale: 'standard',
        });
        expect(standardScaleSalary).toEqual(scaledSalaryColumn);
      });
    });
    describe('fitColumns', () => {
      const extraColumn = [89, 12, 32, 45, 53, 52, 56, 21, 34, 56, ];
      it('should accept simple format for transformations', () => {
        const trainningData = [
          {
            'Country': 'Brazil',
            'Age': '',
            'Salary': '58000',
            'Purchased': 'Yes',
          },
          {
            'Country': 'Mexico',
            'Age': '',
            'Salary': '52000',
            'Purchased': 'false',
          },
          {
            'Country': 'China',
            'Age': '58',
            'Salary': '48000',
            'Purchased': undefined,
          },
        ].concat(csvData);
        const fittingOptions = {
          Country: 'onehot',
          Salary: ['scale', 'standard', ],
          Age: ['parseNumber', ],
        };
        const preprocessingOptions = {
          Salary: ['parseNumber', ],
          Purchased: ['label', { binary:true, }, ],
          Age: ['median', ],
        };
    
        const trainningDataSet = new DataSet(trainningData);
        trainningDataSet.fitColumns(preprocessingOptions);
        trainningDataSet.fitColumns(fittingOptions);
      });
      it('should merge columns', () => {
        const fittedOriginalData = new DataSet([...unmodifiedCSVData,]);
        fittedOriginalData.fitColumns({
          columns: [
            { name: 'Age', },
            {
              name: 'Extra',
              options: {
                strategy: 'merge',
                mergeData: extraColumn,
              },
            },
          ],
        });
        expect(fittedOriginalData.columnArray('Extra')).toEqual(extraColumn);
      });
      it('should only merge columns if data length matches', () => { 
        const fittedOriginalData = new DataSet([...unmodifiedCSVData, ]);
        const newColumn = fittedOriginalData.columnMerge('err', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ]);
        expect(typeof newColumn).toBe('object');
        expect(newColumn).toHaveProperty('err');
        expect(newColumn.err).toBeInstanceOf(Array);
        try {
          fittedOriginalData.columnMerge('err', [1, 2, ]);
        } catch (e) {
          expect(e).toBeInstanceOf(Error);
          expect(e.toString()).toEqual(
            `RangeError: Merged data column must have the same length(2) as the DataSet's length (${10})`
          );
        }
      });
      it('should fit multiple columns', () => {
        const unmodifiedData = new DataSet(unmodifiedCSVData);
        const fittedOriginalData = new DataSet([...unmodifiedCSVData,]);
        const reducer = (result, value, index, arr) => {
          result.push(value * 2);
          return result;
        };

        const fitdata = fittedOriginalData.fitColumns({
          columns: [
            { name: 'Age', },
            {
              name: 'Salary',
              options: {
                scale: 'standard',
              },
            },
            {
              name: 'DoubleSalary',
              options: {
                strategy:'reduce',
                reducerOptions: {
                  columnName: 'Salary',
                  reducer,
                },
              },
            },
            {
              name: 'Purchased',
              options: {
                strategy: 'label',
                labelOptions: {
                  binary: true,
                },
              },
            },
            {
              name: 'Country',
              options: {
                strategy: 'onehot',
                labelOptions: {
                  binary: true,
                },
              },
            },
          ],
        });
        expect(fitdata).toEqual(fittedOriginalData.data);
        const fitObject = fittedOriginalData.fitColumns({
          returnData: false,
          columns: [
            {
              name: 'DoubleAge',
              options: {
                strategy:'reduce',
                reducerOptions: {
                  columnName: 'Age',
                  reducer,
                },
              },
            },
          ],
        });
        expect(fitObject).toEqual(fittedOriginalData);
        expect(unmodifiedData === fittedOriginalData).toBe(false);
        expect(fittedOriginalData.data).not.toBe(unmodifiedCSVData);
        expect(fittedOriginalData.columnArray('Age')).toEqual(unmodifiedData.columnReplace('Age'));
        expect(fittedOriginalData.columnArray('Salary')).toEqual(unmodifiedData.columnReplace('Salary', {
          scale: 'standard',
        }));
      });
    });
    describe('fitInverseTransforms / fitTransforms', () => {
      it('should inverse transforms on dataset', () => {
        const refitDataSet = new DataSet(csvData, { debug: false, });
        const transformedObject = {
          Age: 0.6387122698222066,
          Salary: 72000,
          Purchased: 0,
          Country_Brazil: 1,
          Country_Mexico: 0,
          Country_Ghana: 0,
        };
        const transformedFullObject = {
          Age: 0.6387122698222066,
          Salary: 72000,
          Purchased: 0,
          Country: 'Brazil',
          Country_Brazil: 1,
          Country_Mexico: 0,
          Country_Ghana: 0,
        };
        const originalObject = { Country: 'Brazil', Age: 44, Salary: 72000, Purchased: 'N', };
        refitDataSet.fitColumns({
          Country:'onehot',
          Salary:'parseNumber',
          Age:['scale', 'standard',],
          Purchased:['label',],
        });
        expect(refitDataSet.data[ 0 ]).toEqual(transformedFullObject);
        refitDataSet.fitInverseTransforms({ removeValues: true, });
        expect(refitDataSet.data[ 0 ]).toEqual(originalObject);
        refitDataSet.fitTransforms({ removeValues: true, });
        expect(refitDataSet.data[ 0 ]).toEqual(transformedObject);
        // console.log('BEFORE refitDataSet.data', refitDataSet.data);
        // console.log('AFTER refitDataSet.data', refitDataSet.data);
        // console.log('AFTER REFITREFIT refitDataSet.data', refitDataSet.data);
      });
    });
  });
});