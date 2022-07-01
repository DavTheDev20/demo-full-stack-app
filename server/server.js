require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./utils/dbConnect').connect();
const usersRouter = require('./routes/usersRouter');
const postsRouter = require('./routes/postsRouter');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use('/api/user', usersRouter);
app.use('/api/posts', postsRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server running on port: ${port}`));
