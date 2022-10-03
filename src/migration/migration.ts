/* eslint-disable @typescript-eslint/no-var-requires */
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const translations = require('./translation.json');

const client = new DynamoDBClient({ region: 'ap-southeast-1' });

translations.map((t) => {
    const command = new PutItemCommand({
        TableName: 'nestjs-serverless-dev-translation-table',
        Item: {
            ID: { S: t.ID.toString() },
            Type: { S: t.Type },
            XI_EN_Desc: { S: t.XI_EN_Desc },
            TH_Desc: { S: t.TH_Desc },
        },
    });

    client.send(command);
});

// const command = new PutItemCommand({});
