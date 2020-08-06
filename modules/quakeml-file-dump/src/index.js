const Parser = require("./quakeml/Quakeml");
const fs = require("fs");
const Path = require("path");
const KafkaBuilder = require("kafka-node");

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " dirname");
  process.exit(1);
}
// Read the file and print its contents.
const dirname = process.argv[2];

const Consumer = KafkaBuilder.Consumer;
const client = new KafkaBuilder.KafkaClient();
const consumer = new Consumer(
  client,
  [
    {
      groupId: "quakeml-file-dump_" + Date.now(),
      topic: "early_est_quakeml",
      partition: 0
    }
  ],
  { autoCommit: false }
);

consumer.on("message", kafkaMessage => {
  const rawQuakeml = kafkaMessage.value;
  try {
    const pQuakeml = Parser({ xml: rawQuakeml }); //how to get time?
    console.log("Event Found!");
    const timeOfReport = Date.now();
    fs.writeFile(
      Path.join(dirname, timeOfReport + ".xml"),
      rawQuakeml,
      function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("RawQuakeml " + timeOfReport + ".xml file was saved!");
      }
    );
  } catch (error) {
    return console.log("Discarded message: ", error.message);
  }
});

console.log("Ready to Dump Event!");
