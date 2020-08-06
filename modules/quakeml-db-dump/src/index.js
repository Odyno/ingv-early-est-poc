const url = "mongodb://root:3x4mpl3@localhost:27017/";

const Parser = require("./quakeml/Quakeml");

var log = console.log;

var kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient(),
  consumer = new Consumer(
    client,
    [
      {
        groupId: "quakeml-db-dump_" + Date.now(),
        topic: "early_est_quakeml",
        partition: 0
      }
    ],
    { autoCommit: false }
  );

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect(url, (err, db) => {
  if (err) throw err;

  var dbo = db.db("early_est_reports"); // No one close it

  consumer.on("message", kafkaMessage => {
    message = kafkaMessage.value;
    try {
      quakeml = Parser({ xml: message });
    } catch (error) {
      console.log("Discarded message: ", error.message);
      return;
    }

    const datetime = quakeml.getUpdated();

    var myobj = { datetime, message };

    dbo.collection("events").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 Event saved on DB");
    });
  });
});
