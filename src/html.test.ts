import puppeteer from 'puppeteer';
import path from 'path';

describe('End to End HTML Tests', function(){
  let browser:puppeteer.Browser;
  let page:puppeteer.Page;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });
  afterAll(async () => {
    // await browser.close();
  });
  describe('Browser Usage Test',()=>{
    it('should load CSVs the page', async()=>{
      await page.goto(`file://${path.join(__dirname,'../manual/media/example/example.html')}`,{
        waitUntil: 'networkidle2',
      });
      const loadCSVURI_pre = await page.$eval('pre#csvtest1',(el:any)=>el.innerHTML)
      const loadedCSV = JSON.parse(loadCSVURI_pre)
      expect(loadedCSV).toMatchObject([
        { Country: 'Brazil', Age: 44, Salary: 72000, Purchased: 'No' },
        { Country: 'Mexico', Age: 27, Salary: 48000, Purchased: 'Yes' },
        { Country: 'Ghana', Age: 30, Salary: 54000, Purchased: 'No' },
        { Country: 'Mexico', Age: 38, Salary: 61000, Purchased: 'No' },
        { Country: 'Ghana', Age: 40, Salary: '', Purchased: 'Yes' },
        { Country: 'Brazil', Age: 35, Salary: 58000, Purchased: 'Yes' },
        { Country: 'Mexico', Age: '', Salary: 52000, Purchased: 'No' },
        { Country: 'Brazil', Age: 48, Salary: 79000, Purchased: 'Yes' },
        { Country: 'Ghana', Age: 50, Salary: 83000, Purchased: 'No' },
        { Country: 'Brazil', Age: 37, Salary: 67000, Purchased: 'Yes' }
      ])

      // const pageContent = await page.content()
      // const initialPageData = await page.evaluate(()=>{
      //   const titleText = document.querySelector('title')?.innerHTML
      //   //@ts-ignore
      //   const inputValue = document.querySelector('input[name="inputCount"]')?.value
      //   return {inputValue,titleText}
      // })
      // expect(initialPageData.titleText).toBe('JSONX TEST')
      // expect(parseInt(initialPageData.inputValue)).toBe(0)

      // await page.$eval('#buttonCount',(el:any)=>el.click())
      // await page.$eval('#buttonCount',(el:any)=>el.click())
      // await page.$eval('#buttonCount',(el:any)=>el.click())
      // const modifiedPageData = await page.evaluate(()=>{
      //   //@ts-ignore
      //   const inputValue = document.querySelector('input[name="inputCount"]')?.value
      //   return {inputValue}
      // })
      // // console.log({initialPageData,modifiedPageData})
      // expect(parseInt(modifiedPageData.inputValue)).toBe(3)
      // // await page.screenshot({ path: 'example.png' });
    },10000)
    it('should get binary value on the page', async()=>{
      const selectedColumnHTML = await page.$eval('pre#csvtest2',(el:any)=>el.innerHTML)
      expect(JSON.parse(selectedColumnHTML)).toMatchObject([
        {
          "Country": "Ghana",
          "Age": 50,
          "Salary": 83000,
          "Purchased": "No"
        }
      ]);
    });
    it('should select columns on the page', async()=>{
      const selectedColumnHTML = await page.$eval('pre#csvtest3',(el:any)=>el.innerHTML)
      expect(JSON.parse(selectedColumnHTML)).toMatchObject(
        [
          {
            "Age": 44,
            "Salary": 72000
          },
          {
            "Age": 27,
            "Salary": 48000
          },
          {
            "Age": 30,
            "Salary": 54000
          },
          {
            "Age": 38,
            "Salary": 61000
          },
          {
            "Age": 40,
            "Salary": ""
          },
          {
            "Age": 35,
            "Salary": 58000
          },
          {
            "Age": "",
            "Salary": 52000
          },
          {
            "Age": 48,
            "Salary": 79000
          },
          {
            "Age": 50,
            "Salary": 83000
          },
          {
            "Age": 37,
            "Salary": 67000
          }
        ]
      );
    });
    it('should columnize vectors on the page', async()=>{
      const selectedColumnHTML = await page.$eval('pre#csvtest4',(el:any)=>el.innerHTML)
      expect(JSON.parse(selectedColumnHTML)).toMatchObject({
        "data": [
          "This is really good",
          "I would definitely recommend",
          "The wait staff was really rude",
          "Great views",
          "the food was not great",
          "food came out cold, took forever to get seated",
          "we had a great time, and they were really prompt and attentive",
          "the food was bland",
          "not very flavorful",
          "it was kind of so-so"
        ],
        "tokens": {},
        "vectors": [
          {
            "thi": 1,
            "is": 1,
            "realli": 1,
            "good": 1,
            "i": 0,
            "would": 0,
            "definit": 0,
            "recommend": 0,
            "the": 0,
            "wait": 0,
            "staff": 0,
            "wa": 0,
            "rude": 0,
            "great": 0,
            "view": 0,
            "food": 0,
            "not": 0,
            "came": 0,
            "out": 0,
            "cold": 0,
            "took": 0,
            "forev": 0,
            "to": 0,
            "get": 0,
            "seat": 0,
            "we": 0,
            "had": 0,
            "a": 0,
            "time": 0,
            "and": 0,
            "thei": 0,
            "were": 0,
            "prompt": 0,
            "attent": 0,
            "bland": 0,
            "veri": 0,
            "flavor": 0,
            "it": 0,
            "kind": 0,
            "of": 0,
            "so": 0
          },
          {
            "thi": 0,
            "is": 0,
            "realli": 0,
            "good": 0,
            "i": 1,
            "would": 1,
            "definit": 1,
            "recommend": 1,
            "the": 0,
            "wait": 0,
            "staff": 0,
            "wa": 0,
            "rude": 0,
            "great": 0,
            "view": 0,
            "food": 0,
            "not": 0,
            "came": 0,
            "out": 0,
            "cold": 0,
            "took": 0,
            "forev": 0,
            "to": 0,
            "get": 0,
            "seat": 0,
            "we": 0,
            "had": 0,
            "a": 0,
            "time": 0,
            "and": 0,
            "thei": 0,
            "were": 0,
            "prompt": 0,
            "attent": 0,
            "bland": 0,
            "veri": 0,
            "flavor": 0,
            "it": 0,
            "kind": 0,
            "of": 0,
            "so": 0
          },
          {
            "thi": 0,
            "is": 0,
            "realli": 1,
            "good": 0,
            "i": 0,
            "would": 0,
            "definit": 0,
            "recommend": 0,
            "the": 1,
            "wait": 1,
            "staff": 1,
            "wa": 1,
            "rude": 1,
            "great": 0,
            "view": 0,
            "food": 0,
            "not": 0,
            "came": 0,
            "out": 0,
            "cold": 0,
            "took": 0,
            "forev": 0,
            "to": 0,
            "get": 0,
            "seat": 0,
            "we": 0,
            "had": 0,
            "a": 0,
            "time": 0,
            "and": 0,
            "thei": 0,
            "were": 0,
            "prompt": 0,
            "attent": 0,
            "bland": 0,
            "veri": 0,
            "flavor": 0,
            "it": 0,
            "kind": 0,
            "of": 0,
            "so": 0
          },
          {
            "thi": 0,
            "is": 0,
            "realli": 0,
            "good": 0,
            "i": 0,
            "would": 0,
            "definit": 0,
            "recommend": 0,
            "the": 0,
            "wait": 0,
            "staff": 0,
            "wa": 0,
            "rude": 0,
            "great": 1,
            "view": 1,
            "food": 0,
            "not": 0,
            "came": 0,
            "out": 0,
            "cold": 0,
            "took": 0,
            "forev": 0,
            "to": 0,
            "get": 0,
            "seat": 0,
            "we": 0,
            "had": 0,
            "a": 0,
            "time": 0,
            "and": 0,
            "thei": 0,
            "were": 0,
            "prompt": 0,
            "attent": 0,
            "bland": 0,
            "veri": 0,
            "flavor": 0,
            "it": 0,
            "kind": 0,
            "of": 0,
            "so": 0
          },
          {
            "thi": 0,
            "is": 0,
            "realli": 0,
            "good": 0,
            "i": 0,
            "would": 0,
            "definit": 0,
            "recommend": 0,
            "the": 1,
            "wait": 0,
            "staff": 0,
            "wa": 1,
            "rude": 0,
            "great": 1,
            "view": 0,
            "food": 1,
            "not": 1,
            "came": 0,
            "out": 0,
            "cold": 0,
            "took": 0,
            "forev": 0,
            "to": 0,
            "get": 0,
            "seat": 0,
            "we": 0,
            "had": 0,
            "a": 0,
            "time": 0,
            "and": 0,
            "thei": 0,
            "were": 0,
            "prompt": 0,
            "attent": 0,
            "bland": 0,
            "veri": 0,
            "flavor": 0,
            "it": 0,
            "kind": 0,
            "of": 0,
            "so": 0
          },
          {
            "thi": 0,
            "is": 0,
            "realli": 0,
            "good": 0,
            "i": 0,
            "would": 0,
            "definit": 0,
            "recommend": 0,
            "the": 0,
            "wait": 0,
            "staff": 0,
            "wa": 0,
            "rude": 0,
            "great": 0,
            "view": 0,
            "food": 1,
            "not": 0,
            "came": 1,
            "out": 1,
            "cold": 1,
            "took": 1,
            "forev": 1,
            "to": 1,
            "get": 1,
            "seat": 1,
            "we": 0,
            "had": 0,
            "a": 0,
            "time": 0,
            "and": 0,
            "thei": 0,
            "were": 0,
            "prompt": 0,
            "attent": 0,
            "bland": 0,
            "veri": 0,
            "flavor": 0,
            "it": 0,
            "kind": 0,
            "of": 0,
            "so": 0
          },
          {
            "thi": 0,
            "is": 0,
            "realli": 1,
            "good": 0,
            "i": 0,
            "would": 0,
            "definit": 0,
            "recommend": 0,
            "the": 0,
            "wait": 0,
            "staff": 0,
            "wa": 0,
            "rude": 0,
            "great": 1,
            "view": 0,
            "food": 0,
            "not": 0,
            "came": 0,
            "out": 0,
            "cold": 0,
            "took": 0,
            "forev": 0,
            "to": 0,
            "get": 0,
            "seat": 0,
            "we": 1,
            "had": 1,
            "a": 1,
            "time": 1,
            "and": 2,
            "thei": 1,
            "were": 1,
            "prompt": 1,
            "attent": 1,
            "bland": 0,
            "veri": 0,
            "flavor": 0,
            "it": 0,
            "kind": 0,
            "of": 0,
            "so": 0
          },
          {
            "thi": 0,
            "is": 0,
            "realli": 0,
            "good": 0,
            "i": 0,
            "would": 0,
            "definit": 0,
            "recommend": 0,
            "the": 1,
            "wait": 0,
            "staff": 0,
            "wa": 1,
            "rude": 0,
            "great": 0,
            "view": 0,
            "food": 1,
            "not": 0,
            "came": 0,
            "out": 0,
            "cold": 0,
            "took": 0,
            "forev": 0,
            "to": 0,
            "get": 0,
            "seat": 0,
            "we": 0,
            "had": 0,
            "a": 0,
            "time": 0,
            "and": 0,
            "thei": 0,
            "were": 0,
            "prompt": 0,
            "attent": 0,
            "bland": 1,
            "veri": 0,
            "flavor": 0,
            "it": 0,
            "kind": 0,
            "of": 0,
            "so": 0
          },
          {
            "thi": 0,
            "is": 0,
            "realli": 0,
            "good": 0,
            "i": 0,
            "would": 0,
            "definit": 0,
            "recommend": 0,
            "the": 0,
            "wait": 0,
            "staff": 0,
            "wa": 0,
            "rude": 0,
            "great": 0,
            "view": 0,
            "food": 0,
            "not": 1,
            "came": 0,
            "out": 0,
            "cold": 0,
            "took": 0,
            "forev": 0,
            "to": 0,
            "get": 0,
            "seat": 0,
            "we": 0,
            "had": 0,
            "a": 0,
            "time": 0,
            "and": 0,
            "thei": 0,
            "were": 0,
            "prompt": 0,
            "attent": 0,
            "bland": 0,
            "veri": 1,
            "flavor": 1,
            "it": 0,
            "kind": 0,
            "of": 0,
            "so": 0
          },
          {
            "thi": 0,
            "is": 0,
            "realli": 0,
            "good": 0,
            "i": 0,
            "would": 0,
            "definit": 0,
            "recommend": 0,
            "the": 0,
            "wait": 0,
            "staff": 0,
            "wa": 1,
            "rude": 0,
            "great": 0,
            "view": 0,
            "food": 0,
            "not": 0,
            "came": 0,
            "out": 0,
            "cold": 0,
            "took": 0,
            "forev": 0,
            "to": 0,
            "get": 0,
            "seat": 0,
            "we": 0,
            "had": 0,
            "a": 0,
            "time": 0,
            "and": 0,
            "thei": 0,
            "were": 0,
            "prompt": 0,
            "attent": 0,
            "bland": 0,
            "veri": 0,
            "flavor": 0,
            "it": 1,
            "kind": 1,
            "of": 1,
            "so": 2
          }
        ],
        "wordMap": {
          "thi": 0,
          "is": 0,
          "realli": 0,
          "good": 0,
          "i": 0,
          "would": 0,
          "definit": 0,
          "recommend": 0,
          "the": 0,
          "wait": 0,
          "staff": 0,
          "wa": 0,
          "rude": 0,
          "great": 0,
          "view": 0,
          "food": 0,
          "not": 0,
          "came": 0,
          "out": 0,
          "cold": 0,
          "took": 0,
          "forev": 0,
          "to": 0,
          "get": 0,
          "seat": 0,
          "we": 0,
          "had": 0,
          "a": 0,
          "time": 0,
          "and": 0,
          "thei": 0,
          "were": 0,
          "prompt": 0,
          "attent": 0,
          "bland": 0,
          "veri": 0,
          "flavor": 0,
          "it": 0,
          "kind": 0,
          "of": 0,
          "so": 0
        },
        "wordCountMap": {
          "thi": 1,
          "is": 1,
          "realli": 3,
          "good": 1,
          "i": 1,
          "would": 1,
          "definit": 1,
          "recommend": 1,
          "the": 3,
          "wait": 1,
          "staff": 1,
          "wa": 4,
          "rude": 1,
          "great": 3,
          "view": 1,
          "food": 3,
          "not": 2,
          "came": 1,
          "out": 1,
          "cold": 1,
          "took": 1,
          "forev": 1,
          "to": 1,
          "get": 1,
          "seat": 1,
          "we": 1,
          "had": 1,
          "a": 1,
          "time": 1,
          "and": 2,
          "thei": 1,
          "were": 1,
          "prompt": 1,
          "attent": 1,
          "bland": 1,
          "veri": 1,
          "flavor": 1,
          "it": 1,
          "kind": 1,
          "of": 1,
          "so": 2
        },
        "maxFeatures": 9,
        "sortedWordCount": [
          "wa",
          "realli",
          "the",
          "great",
          "food",
          "not",
          "and",
          "so",
          "thi",
          "is",
          "good",
          "i",
          "would",
          "definit",
          "recommend",
          "wait",
          "staff",
          "rude",
          "view",
          "came",
          "out",
          "cold",
          "took",
          "forev",
          "to",
          "get",
          "seat",
          "we",
          "had",
          "a",
          "time",
          "thei",
          "were",
          "prompt",
          "attent",
          "bland",
          "veri",
          "flavor",
          "it",
          "kind",
          "of"
        ],
        "limitedFeatures": [
          [
            "wa"
          ],
          [
            "realli"
          ],
          [
            "the"
          ],
          [
            "great"
          ],
          [
            "food"
          ],
          [
            "not"
          ],
          [
            "and"
          ],
          [
            "so"
          ],
          [
            "thi"
          ]
        ],
        "matrix": [
          [
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            1
          ],
          [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            1,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0
          ],
          [
            1,
            0,
            1,
            1,
            1,
            1,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0
          ],
          [
            0,
            1,
            0,
            1,
            0,
            0,
            2,
            0,
            0
          ],
          [
            1,
            0,
            1,
            0,
            1,
            0,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0
          ],
          [
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            2,
            0
          ]
        ]
      })
    });
    it('should cross validate on the page', async()=>{
      const selectedColumnHTML = await page.$eval('pre#csvtest5',(el:any)=>el.innerHTML)
      expect(JSON.parse(selectedColumnHTML)).toMatchObject({
        "train": [
          50,
          20,
          34,
          33,
          10,
          23
        ],
        "test": [
          25,
          42,
          19,
          90
        ]
      });
    });
    it('should use ARL on the page', async()=>{
      const selectedColumnHTML = await page.$eval('pre#csvtest6',(el:any)=>el.innerHTML)
      expect(JSON.parse(selectedColumnHTML)).toMatchObject({
        "gt": {
          "values": {},
          "valuesMap": {},
          "transactions": [
            [
              "0",
              "1",
              "2"
            ],
            [
              "3",
              "1",
              "4"
            ],
            [
              "0",
              "3",
              "1",
              "4"
            ],
            [
              "3",
              "4"
            ],
            [
              "0",
              "3",
              "1",
              "4"
            ]
          ]
        },
        "arl": [
          {
            "items_labels": [
              "Cups",
              "Silverware"
            ],
            "items": [
              "3",
              "4"
            ],
            "support": 4,
            "support_percent": 0.8
          },
          {
            "items_labels": [
              "Cookies",
              "Milk"
            ],
            "items": [
              "0",
              "1"
            ],
            "support": 3,
            "support_percent": 0.6
          },
          {
            "items_labels": [
              "Milk",
              "Silverware"
            ],
            "items": [
              "1",
              "4"
            ],
            "support": 3,
            "support_percent": 0.6
          },
          {
            "items_labels": [
              "Milk",
              "Cups"
            ],
            "items": [
              "1",
              "3"
            ],
            "support": 3,
            "support_percent": 0.6
          },
          {
            "items_labels": [
              "Milk",
              "Cups",
              "Silverware"
            ],
            "items": [
              "1",
              "3",
              "4"
            ],
            "support": 3,
            "support_percent": 0.6
          },
          {
            "items_labels": [
              "Cookies",
              "Silverware"
            ],
            "items": [
              "0",
              "4"
            ],
            "support": 2,
            "support_percent": 0.4
          },
          {
            "items_labels": [
              "Cookies",
              "Silverware",
              "Milk"
            ],
            "items": [
              "0",
              "4",
              "1"
            ],
            "support": 2,
            "support_percent": 0.4
          },
          {
            "items_labels": [
              "Cookies",
              "Cups"
            ],
            "items": [
              "0",
              "3"
            ],
            "support": 2,
            "support_percent": 0.4
          },
          {
            "items_labels": [
              "Cookies",
              "Cups",
              "Silverware"
            ],
            "items": [
              "0",
              "3",
              "4"
            ],
            "support": 2,
            "support_percent": 0.4
          },
          {
            "items_labels": [
              "Cookies",
              "Cups",
              "Milk"
            ],
            "items": [
              "0",
              "3",
              "1"
            ],
            "support": 2,
            "support_percent": 0.4
          },
          {
            "items_labels": [
              "Cookies",
              "Cups",
              "Milk",
              "Silverware"
            ],
            "items": [
              "0",
              "3",
              "1",
              "4"
            ],
            "support": 2,
            "support_percent": 0.4
          }
        ]
      })
    });
  });
});