const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_CONNECTION, {useMongoClient: true})
  .then(() => {
    console.log('connection successful');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
