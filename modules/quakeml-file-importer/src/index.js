var kafka = require("kafka-node"),
  Producer = kafka.Producer,
  client = new kafka.KafkaClient(),
  producer = new Producer(client);

producer.on("ready", () => {
  console.log("I'm ready to send message");

  // Make sure we got a filename on the command line.
  if (process.argv.length < 3) {
    console.log("Usage: node " + process.argv[1] + " FILENAME");
    process.exit(1);
  }
  // Read the file and print its contents.
  var fs = require("fs"),
    filenameParam = process.argv[2];

  sendfile(fs, filenameParam);
});

producer.on("error", function(err) {
  console.log(err);
});

sendfile = (fs, filename) => {
  console.log("Sending: " + filename);

  fs.readFile(filename, "utf8", function(err, filecontent) {
    if (err) throw err;
    console.log("Send OK: " + filename);
    //Diversi
    payloads = [
      {
        topic: "early_est_quakeml",
        messages: filecontent,
        partition: 0
      }
    ];
    producer.send(payloads, (err, data) => {
      if (err) {
        console.error("Some error appears on send", err);
        throw err;
      } else {
        console.log("Sent!");
        process.exit();
      }
    });
  });
};
