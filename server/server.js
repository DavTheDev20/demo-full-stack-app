require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('./utils/dbConnect').connect();
const usersRouter = require('./routes/usersRouter');
const postsRouter = require('./routes/postsRouter');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/user', usersRouter);

app.use('/api/posts', postsRouter);

app.listen(port, () => console.log(`Server running on port: ${port}`));
