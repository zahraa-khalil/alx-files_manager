/* eslint-disable */
const express = require('express');
import routes from './routes';

const app = express();

app.use(express.json());

app.use('/', routes);

app.listen(5000, () => {
  console.log('Server running on port port 5000');
});
