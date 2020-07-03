const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const confg = require('config');

const app = express();

app.use([
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cookieParser(),
  helmet(),
  morgan('combined')
]);

app.listen(confg.get('PORT'), () => {
  console.log('App Listening on 3001');
});