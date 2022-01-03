const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { limiter } = require('./middleware/limiter');
const { errorController } = require('./middleware/errorController');
const routes = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');

dotenv.config();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(requestLogger);

app.use('/', routes);

app.get('*', (req, res) => {
  throw new NotFoundError('Requested resource cannot be found');
});

app.use(limiter);

app.use(errorLogger);

app.use(errorController);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${PORT}`);
});
