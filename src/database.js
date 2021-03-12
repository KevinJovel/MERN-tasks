const mongoose = require('mongoose');

const mongoAtlasUri = `mongodb+srv://bd_user-learning:${process.env.Password}@cluster0.2mlg8.mongodb.net/TasksDB?retryWrites=true&w=majority`;
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