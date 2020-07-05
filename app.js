const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const api = require('./server/api');

const app = express();

const init = async () => {
  try {
    mongoose.connect(config.get('DATABASE_URL'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
    mongoose.connection.on('error', error => console.error(error));

    app.use([
      bodyParser.json(),
      bodyParser.urlencoded({ extended: false }),
      cors({
        credentials: true,
        origin: true
      }),
      cookieParser(),
      helmet(),
      morgan('combined')
    ]);

    app.use('/api', api);
    app.use('/static', express.static(path.join(__dirname, 'build/static')));
    app.use('/*', express.static(path.join(__dirname, 'build')));

    app.listen(config.get('PORT'), () => {
      console.log('App Listening on 3001');
    });
  } catch (error) {
    console.error('Error initializing server', error);
    process.exit(0);
  }
};

init();