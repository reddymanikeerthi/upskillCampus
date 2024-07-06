const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

AWS.config.update({
  region: 'your-region',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.get('/api/traffic-data', (req, res) => {
  const params = {
    TableName: 'TrafficData',
  };

  dynamoDB.scan(params, (err, data) => {
    if (err) {
      console.error('Unable to scan the table. Error:', JSON.stringify(err, null, 2));
      res.status(500).send(err);
    } else {
      res.json(data.Items);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
