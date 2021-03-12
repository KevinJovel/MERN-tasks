const mongoose = require('mongoose');

const mongoAtlasUri = process.env.MONGO_URI;
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }
module.exports = mongoose;

//otra forma de configuracion de conexion a bd
// mongoose.connect('', {useNewUrlParser: true, useUnifiedTopology: true})
// .then(db=> console.log('DB is connected'))
// .catch(err=> console.log(err));