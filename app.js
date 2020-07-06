const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const api = require('./server/api');

app.use([
  morgan('combined'),
  helmet(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cookieParser(),
  cors({
    credentials: true,
    origin: true
  }),
]);

app.use('/api', api);
app.use('/static', express.static(path.join(__dirname, 'build/static')));
app.use('/*', express.static(path.join(__dirname, 'build')));

const init = async () => {
  try {
    await mongoose.connect(config.get('DATABASE_URL'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
    mongoose.connection.on('error', error => console.error(error));


    app.listen(config.get('PORT'), () => {
      console.log(`App Listening on ${config.get('PORT')}`);
    });
  } catch (error) {
    console.error('Error initializing server', error);
    process.exit(0);
  }
};

init();