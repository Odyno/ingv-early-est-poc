var kafka = require("kafka-node"),
  Producer = kafka.Producer,
  client = new kafka.KafkaClient(),
  producer = new Producer(client);

const RL = require("./RemoteListner");

console.logCopy = console.log.bind(console);

console.log = function(data) {
  var currentDate = "[" + new Date().toUTCString() + "] ";
  this.logCopy(currentDate, data);
};

let lastEvent = "";

producer.on("ready", () => {
  console.log("I'm ready to grab message and send in pipeline");

  RL.startContinuePool(
    "http://early-est.rm.ingv.it/monitor.xml",
    15000,
    (error, quakemlMessage) => {
      if (error) {
        console.log("Check Message: Error Appear on Request!", error);
      } else {
        if (lastEvent.localeCompare(quakemlMessage) !== 0) {
          //Diversi
          payloads = [
            {
              topic: "early_est_quakeml",
              messages: quakemlMessage,
              partition: 0
            }
          ];
          producer.send(payloads, (err, data) => {
            if (err) {
              console.error("Check Message: Some error appears on send", err);
            } else {
              lastEvent = quakemlMessage;
              console.log("Check Message: New message discovered... sent!");
            }
          });
        } else {
          //Uguali
          console.log("Check Message: No change discovered.");
        }
      }
    }
  );
});

producer.on("error", function(err) {
  console.log(err);
});
