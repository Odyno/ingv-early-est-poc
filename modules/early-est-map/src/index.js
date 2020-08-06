var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const ToLog = require("./util/ToLog");
const Parser = require("./quakeml/Quakeml");

var kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient(),
  consumer = new Consumer(
    client,
    [
      {
        groupId: "early-est-map_" + Date.now(),
        topic: "early_est_quakeml",
        partition: 0
      }
    ],
    {
      autoCommit: false
    }
  );

app.use(express.static(__dirname + "/static"));

// TEST SOCKET IO
var numMessageManaged = 0;
var numMessageWithEvents = 0;
io.on("connection", socket => {
  console.log("A New user is connected");

  consumer.on("message", message => {
    socket.emit("totMessage", numMessageManaged++);
    try {
      const pQuakeml = Parser({ xml: message.value }); //how to get time?
      console.log("New message!");
      socket.emit("rawMessage", message.value.substring(0, 30));
      socket.emit("eventMessage", ToLog.Quakeml2html(pQuakeml));
      socket.emit("msgWithEvent", numMessageWithEvents++);
    } catch (error) {
      console.log("Discarded message: ", error.message);
      return;
    }
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

// RUN SERVER
http.listen(3000, function() {
  console.log("listening on *:3000");
});
