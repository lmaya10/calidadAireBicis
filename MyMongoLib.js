const MongoClient = require("mongodb").MongoClient;

const MyMongoLib = () => {

  const MyMongoLib = this || {};
  // Connection URL
  const url = process.env.MONGO_URL || "mongodb+srv://admin:admin@cluster0-gk0ns.mongodb.net/test?retryWrites=true&w=majority";

  // Database Name
  const dbName = "PruebaReactive";

  // Create a new MongoClient
  const client = new MongoClient(url);


  MyMongoLib.getDocs = () => 
    new Promise((resolve, reject) => {
      client.connect(function(err, client) {
        if(err !== null) {
          reject(err);
          return;
        }
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Insert a single document
        const testCol = db.collection("test");
        testCol
          .find({})
          .limit(20)
          .toArray()
          .then(resolve)
          .catch(reject);
      });
    });

  MyMongoLib.listenToChanges = (cbk) => {
    client.connect((err,client) => {
      if(err !== null)
      {
        throw(err);
      }
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      const testCol = db.collection("test");

      const csCursor = testCol.watch();
      
      console.log("Esta escuchando");
      csCursor.on("change", data => {
        console.log("changed", data);

        MyMongoLib.getDocs().then(docs => cbk(JSON.stringify(docs)));

      });

    });
  };

  // Use connect method to connect to the Server
  

  return MyMongoLib;
};

module.exports = MyMongoLib;

