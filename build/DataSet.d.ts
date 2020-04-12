export declare type DataSetTransform = {
    [index: string]: string[] | any;
};
export declare type FitColumnsOption = {
    name: string;
    options?: {
        [index: string]: any;
    };
};
export declare type FitColumnsOptions = FitColumnsOption[];
export declare type Vector = number[];
export declare type Matrix = number[][];
export declare type ReverseColumnMatrixOptions = {
    vectors?: Matrix;
    labels?: string[];
};
export declare type ReverseColumnVectorOptions = {
    vector?: Vector;
    labels?: string[];
};
export declare type ColumnArrayOptions = {
    [index: string]: any;
};
export declare type variableLabels = Array<Array<string>>;
export declare type OneHotEncoderOptions = {
    merge: boolean;
    data: Vector;
    columnArrayOptions: ColumnArrayOptions;
    prefix: string;
};
export declare type OneHotEncodedData = {
    [index: string]: Vector;
};
export declare type Datum = {
    [index: string]: any;
};
export declare type Data = Datum[];
/**
 * class for manipulating an array of objects, typically from CSV data
 * @class DataSet
 * @memberOf preprocessing
 */
export declare class DataSet {
    config: {
        [index: string]: any;
    };
    data: Data;
    labels: any;
    encoders: any;
    scalers: any;
    selectColumns: (...args: any[]) => any;
    columnArray: (...args: any[]) => any;
    encodeObject: (...args: any[]) => any;
    oneHotEncoder: (...args: any[]) => any;
    oneHotDecoder: (...args: any[]) => any;
    columnMatrix: (...args: any[]) => any;
    reverseColumnMatrix: (...args: any[]) => any;
    reverseColumnVector: (...args: any[]) => any;
    getTransforms: (...args: any[]) => any;
    static encoders: any;
    static data: any;
    /**
     * Allows for fit transform short hand notation
     * @example
  DataSet.getTransforms({
    Age: ['scale',],
    Rating: ['label',],  }); //=> [
  //   {
  //    name: 'Age', options: { strategy: 'scale', }, },
  //   },
  //   {
  //    name: 'Rating', options: { strategy: 'label', },
  //   },
  // ];
     * @param {Object} transforms
     * @returns {Array<Object>} returns fit columns, columns property
     */
    static getTransforms(transforms?: DataSetTransform): FitColumnsOptions;
    /**
     * returns an array of objects by applying labels to matrix of columns
     * @example
  const data = [{ Age: '44', Salary: '44' },
  { Age: '27', Salary: '27' }]
  const AgeDataSet = new MS.DataSet(data);
  const dependentVariables = [ [ 'Age', ], [ 'Salary', ], ];
  const AgeSalMatrix = AgeDataSet.columnMatrix(dependentVariables); // =>
  //  [ [ '44', '72000' ],
  //  [ '27', '48000' ] ];
  MS.DataSet.reverseColumnMatrix({vectors:AgeSalMatrix,labels:dependentVariables}); // => [{ Age: '44', Salary: '44' },
  { Age: '27', Salary: '27' }]
     *
     * @param {*} options
     * @param {Array[]} options.vectors - array of vectors
     * @param {String[]} options.labels - array of labels
     * @returns {Object[]} an array of objects with properties derived from options.labels
     */
    static reverseColumnMatrix(options?: ReverseColumnMatrixOptions): Data;
    static reverseColumnVector(options?: ReverseColumnVectorOptions): Data;
    /**
     * Returns an object into an one hot encoded object
     * @example
  const labels = ['apple', 'orange', 'banana',];
  const prefix = 'fruit_';
  const name = 'fruit';
  const options = { labels, prefix, name, };
  const data = {
    fruit: 'apple',
  };
  EncodedCSVDataSet.encodeObject(data, options); // => { fruit_apple: 1, fruit_orange: 0, fruit_banana: 0, }
     * @param {Object} data - object to encode
     * @param {{labels:Array<String>,prefix:String,name:String}} options - encoded object options
     * @returns {Object} one hot encoded object
     */
    static encodeObject(data: Datum, options: {
        labels: string[];
        prefix: string;
        name: string;
    }): Datum;
    /**
   * returns a new object of one hot encoded values
   * @example
   * // [ 'Brazil','Mexico','Ghana','Mexico','Ghana','Brazil','Mexico','Brazil','Ghana', 'Brazil' ]
  const originalCountry = dataset.columnArray('Country');
  
  // { originalCountry:
  //    { Country_Brazil: [ 1, 0, 0, 0, 0, 1, 0, 1, 0, 1 ],
  //      Country_Mexico: [ 0, 1, 0, 1, 0, 0, 1, 0, 0, 0 ],
  //      Country_Ghana: [ 0, 0, 1, 0, 1, 0, 0, 0, 1, 0 ] },
  //     }
  const oneHotCountryColumn = dataset.oneHotEncoder('Country');
    * @param {string} name - csv column header, or JSON object property name
    * @param options
    * @see {@link http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html}
    * @return {Object}
    */
    static oneHotEncoder(this: any, name: string, options: OneHotEncoderOptions): OneHotEncodedData;
    /**
     * Return one hot encoded data
     * @example
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
    ...
  ];
  const EncodedCSVDataSet = new ms.preprocessing.DataSet(csvData);
  EncodedCSVDataSet.fitColumns({
    columns: [
      {
        name: 'Country',
        options: { strategy: 'onehot', },
      },
    ],
  });
  
  EncodedCSVDataSet.oneHotDecoder('Country);// =>
  // [ { Country: 'Brazil' },
  //  { Country: 'Mexico' },
  //  { Country: 'Ghana' },
  //  { Country: 'Mexico' },
  //   ...]
     * @param {string} name - column name
     * @param options
     * @returns {Array<Object>} returns an array of objects from an one hot encoded column
     */
    static oneHotDecoder(name: any, options: any): any;
    static oneHotColumnArray(name: any, oneHotColumnArrayOptions: any): any;
    /**
     * returns a list of objects with only selected columns as properties
   * @example
  const data = [{ Age: '44', Salary: '44' , Height: '34' },
  { Age: '27', Salary: '44' , Height: '50'  }]
  const AgeDataSet = new MS.DataSet(data);
  const cols = [ 'Age', 'Salary' ];
  const selectedCols = CSVDataSet.selectColumns(cols); // => [{ Age: '44', Salary: '44' },
  { Age: '27', Salary: '27' }]
     *
     * @param {String[]} names - array of selected columns
     * @param {*} options
     * @returns {Object[]} an array of objects with properties derived from names
     */
    static selectColumns(names: any[], options?: any): any;
    /**
     * returns a new array of a selected column from an array of objects, can filter, scale and replace values
     * @example
     * //column Array returns column of data by name
  // [ '44','27','30','38','40','35','','48','50', '37' ]
  const OringalAgeColumn = dataset.columnArray('Age');
    * @param {string} name - csv column header, or JSON object property name
    * @param options
    * @param {function} [options.prefilter=(arr[val])=>true] - prefilter values to return
    * @param {function} [options.filter=(arr[val])=>true] - filter values to return
    * @param {function} [options.replace.test=undefined] - test function for replacing values (arr[val])
    * @param {(string|number|function)} [options.replace.value=undefined] - value to replace (arr[val]) if replace test is true, if a function (result,val,index,arr,name)=>your custom value
    * @param {number} [options.parseIntBase=10] - radix value for parseInt
    * @param {boolean} [options.parseFloat=false] - convert values to floats
    * @param {boolean} [options.parseInt=false] - converts values to ints
    * @param {boolean} [options.scale=false] - standard or minmax feature scale values
    * @returns {array}
    */
    static columnArray(name: string | number, options?: any): any;
    /**
     * returns a matrix of values by combining column arrays into a matrix
     * @example const csvObj = new DataSet([{col1:1,col2:5},{col1:2,col2:6}]);
  csvObj.columnMatrix([['col1',{parseInt:true}],['col2']]); // =>
  //[
  //  [1,5],
  //  [2,6],
  //]
    * @param {Array} [vectors=[]] - array of arguments for columnArray to merge columns into a matrix
    * @param {Array} [data=[]] - array of data to convert to matrix
    * @returns {Array} a matrix of column values
    */
    static columnMatrix(vectors?: never[], data?: never[]): Matrix;
    /**
     * returns a JavaScript Object from a Map (supports nested Map Objects)
     * @example const csvObj = new DataSet([{col1:1,col2:5},{col1:2,col2:6}]);
  csvObj.columnMatrix([['col1',{parseInt:true}],['col2']]); // =>
  //[
  //  [1,5],
  //  [2,6],
  //]
    * @param {Map} mapObj - Map to convert into JavaScript Object
    * @returns {Object} JavaScript Object converted from a Map
    */
    static mapToObject(mapObj?: Map<any, any>): any;
    /**
     * returns 0 or 1 depending on the input value
     * @example DataSet.getBinaryValue('true') // => 1
  DataSet.getBinaryValue('false') // => 0
  DataSet.getBinaryValue('No') // => 0
  DataSet.getBinaryValue(false) // => 0
    * @param {String|Number} [value=''] - value to convert to a 1 or a 0
    * @returns {Number} 0 or 1 depending on truthiness of value
    */
    static getBinaryValue(value?: string | boolean): 0 | 1;
    /**
     * creates a new raw data instance for preprocessing data for machine learning
     * @example
     * const dataset = new ms.DataSet(csvData);
     * @param {Object[]} dataset
     * @returns {this}
     */
    constructor(data?: Data, options?: {});
    /**
     * returns Object of all encoders and scalers
     * @example const csvObj = new DataSet([{col1:1,col2:5},{col1:false,col2:6}]);
  DataSet.fitColumns({col1:['label',{binary:true}]});
  Dataset.data // => [{col1:true,col2:5},{col1:false,col2:6}]
  Dataset.exportFeatures() //=> { labels: { col1: { "0": false, "1": true, "N": 0, "Yes": 1, "No": 0, "f": 0, "false": 1, } } }
    * @param {Function} [filter=()=>true] - filter function
    * @returns {{labels:Map,encoders:Map,scalers:map}} JavaScript Object of transforms encoders and scalers(labels, encoders, scalers)
    */
    exportFeatures(options?: {}): {
        encoders: any;
        labels: any;
        scalers: any;
    };
    /**
     * set encoders, labels and scalers
     * @example const csvObj = new DataSet([{col1:1,col2:5},{col1:false,col2:6}]);
  DataSet.fitColumns({col1:['label',{binary:true}]});
  Dataset.data // => [{col1:true,col2:5},{col1:false,col2:6}]
  Dataset.exportFeatures() //=> { labels: { col1: { "0": false, "1": true, "N": 0, "Yes": 1, "No": 0, "f": 0, "false": 1, } } }
    * @param {{labels:Map,encoders:Map,scalers:map}} [features={}] - JavaScript Object of transforms encoders and scalers(labels, encoders, scalers)
    */
    importFeatures(features?: any): void;
    /**
     * returns filtered rows of data
     * @example const csvObj = new DataSet([{col1:1,col2:5},{col1:2,col2:6}]);
  csvObj.filterColumn((row)=>row.col1>=2); // =>
  //[
  //  [2,6],
  //]
    * @param {Function} [filter=()=>true] - filter function
    * @returns {Array} filtered array of data
    */
    filterColumn(filter?: () => boolean): Datum[];
    /**
     * Returns a new array of scaled values which can be reverse (descaled). The scaling transformations are stored on the DataSet
     * @example
  //dataset.columnArray('Age') => [ '44','27','30','38','40','35',38.77777777777778,'48','50','37' ]
  dataset.columnScale('Age',{strategy:'log'}) // => [ 3.784189633918261,
    3.295836866004329, 3.4011973816621555, 3.6375861597263857, 3.6888794541139363, 3.5553480614894135, 3.657847344866208, 3.8712010109078907, 3.912023005428146, 3.6109179126442243 ]
  dataset.scalers.get('Age').scale(45) // => 3.8066624897703196
  dataset.scalers.get('Age').descale(3.8066624897703196) // => 45
  //this supports, log/exponent, minmax/normalization and standardscaling
     * @param {string} name - name - csv column header, or JSON object property name
     * @param {string} [options.strategy="log"] - strategy for scaling values
     * @returns {number[]} returns an array of scaled values
     */
    columnScale(name: any, options?: {}): number[];
    /**
     * Returns a new array of descaled values
     * @example
  //dataset.columnArray('Age') => [ '44','27','30','38','40','35',38.77777777777778,'48','50','37' ]
  const scaledData = [ 3.784189633918261,
    3.295836866004329, 3.4011973816621555, 3.6375861597263857, 3.6888794541139363, 3.5553480614894135, 3.657847344866208, 3.8712010109078907, 3.912023005428146, 3.6109179126442243 ]
  dataset.columnDescale('Age') // => [ '44','27','30','38','40','35',38.77777777777778,'48','50','37' ]
     * @param {string} name - name - csv column header, or JSON object property name
     * @param {string} [options.strategy="log"] - strategy for scaling values
     * @returns {number[]} returns an array of scaled values
     */
    columnDescale(name: any, options: any): any;
    /**
     * returns a new array and label encodes a selected column
     * @example
     * const oneHotCountryColumn = dataset.oneHotEncoder('Country');
  
  // [ 'N', 'Yes', 'No', 'f', 'Yes', 'Yes', 'false', 'Yes', 'No', 'Yes' ]
  const originalPurchasedColumn = dataset.labelEncoder('Purchased');
  // [ 0, 1, 0, 0, 1, 1, 1, 1, 0, 1 ]
  const encodedBinaryPurchasedColumn = dataset.labelEncoder('Purchased',{ binary:true });
  // [ 0, 1, 2, 3, 1, 1, 4, 1, 2, 1 ]
  const encodedPurchasedColumn = dataset.labelEncoder('Purchased');
    * @param {string} name - csv column header, or JSON object property name
    * @param options
    * @param {boolean} [options.binary=false] - only replace with (0,1) with binary values
    * @param {function} options.sortFunction - custom label encoding value sort function
    * @see {@link http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.LabelEncoder.html}
    * @returns {array}
    */
    labelEncoder(name: any, options: {}): any;
    /**
       * returns a new array and decodes an encoded column back to the original array values
       * @param {string} name - csv column header, or JSON object property name
       * @param options
       * @returns {array}
       */
    labelDecode(name: any, options?: any): any;
    /**
     * Return one hot encoded data
     * @example
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
    ...
  ];
  const EncodedCSVDataSet = new ms.preprocessing.DataSet(csvData);
  EncodedCSVDataSet.fitColumns({
    columns: [
      {
        name: 'Country',
        options: { strategy: 'onehot', },
      },
    ],
  });
  
  EncodedCSVDataSet.oneHotColumnArray('Country);// =>
  // [ { Country_Brazil: 1, Country_Mexico: 0, Country_Ghana: 0 },
  //   { Country_Brazil: 0, Country_Mexico: 1, Country_Ghana: 0 },
  //   { Country_Brazil: 0, Country_Mexico: 0, Country_Ghana: 1 },
  //   ...]
     * @param {string} name - column name
     * @param options
     * @returns {Array<Object>} returns an array of objects from an one hot encoded column
     */
    oneHotColumnArray(name: any, options: any): any;
    /**
   * it returns a new column that reduces a column into a new column object, this is used in data prep to create new calculated columns for aggregrate statistics
   * @example
  const reducer = (result, value, index, arr) => {
  result.push(value * 2);
  return result;
  };
  CSVDataSet.columnReducer('DoubleAge', {
  columnName: 'Age',
  reducer,
  }); //=> { DoubleAge: [ 88, 54, 60, 76, 80, 70, 0, 96, 100, 74 ] }
    * @param {String} name - name of new Column
    * @param {Object} options
    * @param {String} options.columnName - name property for columnArray selection
    * @param {Object} options.columnOptions - options property for columnArray
    * @param {Function} options.reducer - reducer function to reduce into new array, it should push values into the resulting array
    * @returns {Object} a new object that has reduced array as the value
    */
    columnReducer(name: any, options: {
        columnName: any;
        columnOptions: any;
        reducer: any;
    }): {
        [x: number]: any;
    };
    /**
     * it returns a new column that is merged onto the data set
     * @example
  CSVDataSet.columnMerge('DoubleAge', [ 88, 54, 60, 76, 80, 70, 0, 96, 100, 74 ]); //=> { DoubleAge: [ 88, 54, 60, 76, 80, 70, 0, 96, 100, 74 ] }
      * @param {String} name - name of new Column
      * @param {Array} data - new dataset data
      * @returns {Object}
      */
    columnMerge(name: any, data?: never[]): {
        [x: number]: never[];
    };
    /**
     * Inverses transform on an object
     * @example
  DataSet.data; //[{
  //   Age: 0.6387122698222066,
  //   Salary: 72000,
  //   Purchased: 0,
  //   Country_Brazil: 1,
  //   Country_Mexico: 0,
  //   Country_Ghana: 0,
  // }, ...]
  DataSet.inverseTransformObject(DataSet.data[0]); // => {
  //  Country: 'Brazil',
  //  Age: 44,
  //  Salary: 72000,
  //  Purchased: 'N',
  // };
     * @param data
     * @param options
     * @returns {Object} returns object with inverse transformed data
     */
    inverseTransformObject(data: {
        [x: string]: any;
    }, options: {}): {
        [x: string]: any;
    };
    /**
     * transforms an object and replaces values that have been scaled or encoded
     * @example
  DataSet.transformObject({
    'Country': 'Brazil',
    'Age': '44',
    'Salary': '72000',
    'Purchased': 'N',
  }); // =>
  // {
  //  Country: 'Brazil',
  //  Age: 3.784189633918261,
  //  Salary: '72000',
  //  Purchased: 'N',
  //  Country_Brazil: 1,
  //  Country_Mexico: 0,
  //  Country_Ghana: 0
  // }
     * @param data
     * @param options
     * @returns {Object}
     */
    transformObject(data: {
        [x: string]: any;
    }, options: {}): {
        [x: string]: any;
    };
    /**
     * returns a new array of a selected column from an array of objects and replaces empty values, encodes values and scales values
     * @example
     * //column Replace returns new Array with replaced missing data
  //[ '44','27','30','38','40','35',38.77777777777778,'48','50','37' ]
  const ReplacedAgeMeanColumn = dataset.columnReplace('Age',{strategy:'mean'});
    * @param {string} name - csv column header, or JSON object property name
    * @param options
    * @param {boolean} [options.empty=true] - replace empty values
    * @param {boolean} [options.strategy="mean"] - strategy for replacing value, any array stat method from ml.js (mean, standardDeviation, median) or (label,labelEncoder,onehot,oneHotEncoder)
    * @returns {array|Object[]}
    */
    columnReplace(name: any, options?: any): any;
    /**
       * mutates data property of DataSet by replacing multiple columns in a single command
       * @example
       * //fit Columns, mutates dataset
  dataset.fitColumns({
    columns:[{name:'Age',options:{ strategy:'mean'} }]
  });
  // dataset
  // class DataSet
  //   data:[
  //     {
  //       'Country': 'Brazil',
  //       'Age': '38.77777777777778',
  //       'Salary': '72000',
  //       'Purchased': 'N',
  //     }
  //     ...
  //   ]
    * @param {Boolean} options.returnData - return updated DataSet data property
    * @param {Object[]} options.columns - {name:'columnName',options:{strategy:'mean',labelOoptions:{}},}
    * @returns {Object[]}
    */
    fitColumns(options?: any, mockDataOptions?: {}): this | Data;
    /**
     * Mutate dataset data by inversing all transforms
     * @example
  DataSet.data;
  // [{
  //  Country: 'Brazil',
  //  Age: 3.784189633918261,
  //  Salary: '72000',
  //  Purchased: 'N',
  //  Country_Brazil: 1,
  //  Country_Mexico: 0,
  //  Country_Ghana: 0
  // },
  // ...
  // ]
  DataSet.fitInverseTransforms(); // =>
  // [{
  //   'Country': 'Brazil',
  //   'Age': '44',
  //   'Salary': '72000',
  //   'Purchased': 'N',
  // },
  // ...
  // ]
     * @param options
     */
    fitInverseTransforms(options?: any): this | Data;
    /**
     * Mutate dataset data with all transforms
     * @param options
     * @example
  DataSet.data;
  // [{
  //   'Country': 'Brazil',
  //   'Age': '44',
  //   'Salary': '72000',
  //   'Purchased': 'N',
  // },
  // ...
  // ]
  DataSet.fitTransforms(); // =>
  // [{
  //  Country: 'Brazil',
  //  Age: 3.784189633918261,
  //  Salary: '72000',
  //  Purchased: 'N',
  //  Country_Brazil: 1,
  //  Country_Mexico: 0,
  //  Country_Ghana: 0
  // },
  // ...
  // ]
     */
    fitTransforms(options?: any): this | Data;
}
