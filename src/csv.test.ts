import * as ModelXData from './index';
import chai from 'chai';
import path from 'path';
// import expose from './expose.js';
// const { __dirname, } = expose;
const expect = chai.expect;

describe('loadCSV', function () { 
  describe('loading CSV from File', () => {
    it('should load a csv from a filepath', (done) => {
      expect(ModelXData.csv.loadCSV).to.be.an('function');
      const filepath = path.join(__dirname, '../test/mock/data.csv');
      ModelXData.csv.loadCSV(filepath)
        .then(csv => {
          expect(csv.length).to.be.greaterThan(0);
          done();
        })
        .catch(done);    
    });
    it('should handle errors with invalid files', (done) => {
      ModelXData.csv.loadCSV(path.join(__dirname, '../test/mock/invalid-file.csv'))
        .then(() => {
          done(new Error('should not load CSV'));
        })
        .catch(err => {
          expect(err).to.be.an('error');
          done();
        });
    });
  });
  describe('loading CSV from remote URI', () => {
    it('should load a csv from a remote URI', (done) => {
      // ModelXData.csv.loadCSV('https://www.arttimesjournal.com/data/events-August-2015.csv')
      ModelXData.csv.loadCSV('https://raw.githubusercontent.com/repetere/modelscript/master/test/mock/data.csv')
        .then(csv => {
          expect(csv.length).to.be.greaterThan(0);
          done();
        })
        .catch(done);      
    });
    it('should handle errors with invalid url', (done) => {
      ModelXData.csv.loadCSV('https://raw.githubusercontent.com/repetere/modelscript/master/test/mock/INVALID.csv')
        .then(csv => {
          expect(csv.length).to.be.equal(0);
          done();
        })
        .catch(done); 
    });
    it('should load a csv from a remote URI directly', (done) => {
      expect(ModelXData.csv.loadCSVURI).to.be.an('function');
      // ModelXData.csv.loadCSV('https://www.arttimesjournal.com/data/events-August-2015.csv')
      ModelXData.csv.loadCSVURI('https://raw.githubusercontent.com/repetere/modelscript/master/test/mock/data.csv')
        .then(csv => {
          expect(csv.length).to.be.greaterThan(0);
          done();
        })
        .catch(done);      
    });
    it('should handle errors with invalid url directly', (done) => {
      ModelXData.csv.loadCSVURI('https://raw.githubusercontent.com/repetere/modelscript/master/test/mock/INVALID.csv')
        .then(csv => {
          expect(csv.length).to.be.equal(0);
          done();
        })
        .catch(done); 
    });
  });
  describe('loadTSV', () => {
    it('should load tab separated values', (done) => {
      expect(ModelXData.csv.loadTSV).to.be.an('function');
      ModelXData.csv.loadTSV(path.join(__dirname, '../test/mock/Restaurant_Reviews.tsv'))
        .then(tsv => {
          const firstRow = tsv[ 0 ];
          expect(tsv.length).to.be.greaterThan(0);
          expect(firstRow.Review).to.be.a('string');
          expect(firstRow.Liked).to.be.a('number');
          done();
        })
        .catch(done);  
    });
  });
});