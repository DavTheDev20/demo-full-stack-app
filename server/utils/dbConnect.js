const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((err) => {
      console.log('Error connecting to database, exiting now...');
      console.error(err);
      process.exit(1);
    });
};
