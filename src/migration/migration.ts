/* eslint-disable @typescript-eslint/no-var-requires */
// const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
// const translations = require('./translation.json');
// const categories = require('./categories.json');
// const brands = require('./brands.json');

// const client = new DynamoDBClient({ region: 'ap-southeast-1' });

// translations.map((t) => {
//     const command = new PutItemCommand({
//         TableName: 'nestjs-serverless-dev-translation-table',
//         Item: {
//             ID: { S: t.ID.toString() },
//             Type: { S: t.Type },
//             XI_EN_Desc: { S: t.XI_EN_Desc },
//             FF_EN_Desc: { S: t.FF_EN_Desc },
//             TH_Desc: { S: t.TH_Desc },
//         },
//     });

//     client.send(command);
// });

// categories.map((c) => {
//     const command = new PutItemCommand({
//         TableName: 'nestjs-serverless-dev-subcategory-table',
//         Item: {
//             id: { N: c.id.toString() },
//             category: { S: c.category },
//             subcategory: { S: c.subcategory },
//             minPrice: { N: c.minPrice.toString() },
//             // MaxPrice: { N: c.maxPrice.toString() },
//         },
//     });

//     client.send(command);
// });

// brands.map((b) => {
//     const command = new PutItemCommand({
//         TableName: 'nestjs-serverless-dev-brand-table',
//         Item: {
//             id: { N: b.id.toString() },
//             name: { S: b.brand },
//             multiplier: { N: b.range.toString() },
//         },
//     });

//     client.send(command);
// });

// const command = new PutItemCommand({});
