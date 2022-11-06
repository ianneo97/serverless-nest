// // // import categories from './categories.json';
/* eslint-disable @typescript-eslint/no-var-requires */
// // const categories = require('./categories.json');
// const brands = require('./brands.json');

// const newBrands = brands.map((b, index) => {
//     return {
//         ...b,
//         id: index + 1,
//     };
// });

// console.log(JSON.stringify(newBrands));

// // const newCategories = categories.map((c, index) => {
// //     return {
// //         ...c,
// //         id: index + 1,
// //     };
// // });

// // console.log(JSON.stringify(newCategories));
// const excelToJson = require('convert-excel-to-json');

// const result = excelToJson({
//     sourceFile:
//         // '/Users/ianneo/Desktop/self/serverless-nest/src/migration/FF_tag_trans_mapping (1).xlsx',
//         '/Users/ianneo/Desktop/self/serverless-nest/src/migration/FF_tag_trans_mapping_v1.xlsx',
// });
// console.log(JSON.stringify(result));

// console.log(JSON.stringify(result));
const data = require('./test.json');

// // console.log(data);
const result = data.map((item) => ({
    ID: item.A,
    Type: item.B,
    XI_EN_Desc: item.C,
    FF_EN_Desc: item?.D || '',
    TH_Desc: item.E,
}));

console.log(JSON.stringify(result));
