var express = require("express");
var app = express();
var http = require("http").createServer(app);
const ToLog = require("./util/ToLog");
const Parser = require("./quakeml/Quakeml");

var cors = require("cors");

app.use(cors());

var kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient(),
  consumer = new Consumer(
    client,
    [
      {
        groupId: "early-est-event-service_" + Date.now(),
        topic: "early_est_quakeml",
        partition: 0
      }
    ],
    {
      autoCommit: false
    }
  );

formatOrigin = origin => {
  return {
    type: "Feature",
    properties: {
      mag: "??",
      place: origin["region"].value,
      time: origin["time"].value,
      updated: origin["time"].value,
      tz: 0,
      url: "",
      detail: "",
      felt: null,
      cdi: null,
      mmi: null,
      alert: null,
      status: "automatic",
      tsunami: 0,
      sig: 56,
      net: "ak",
      code: "019dgvthrd",
      ids: origin["publicID"].value,
      sources: ",ak,",
      types: ",geoserve,origin,",
      nst: null,
      dmin: null,
      rms: 0,
      gap: null,
      magType: "ml",
      type: "earthquake",
      title: origin["region"].value || ""
    },
    geometry: {
      type: "Point",
      coordinates: [origin["longitude"].value, origin["latitude"].value, 1.5]
    },
    id: Date.now()
  };
};

lastMessage = {
  type: "FeatureCollection",
  features: []
};

consumer.on("message", kafkaMessage => {
  message = kafkaMessage.value;
  try {
    quakeml = Parser({ xml: message });
    var features = [];
    var origins = quakeml.getOrigins();
    for (o = 0; o < origins.length; o++) {
      features.push(formatOrigin(origins[o]));
    }
    lastMessage = {
      type: "FeatureCollection",
      features
    };
    console.log("LastMessage Updated:", JSON.stringify(lastMessage));
  } catch (error) {
    return;
  }
});

app.get("/api", function(req, res) {
  console.log("LastMessage Provided:", JSON.stringify(lastMessage));
  res.json(lastMessage);
});

// RUN SERVER
http.listen(3001, function() {
  console.log("listening on *:3001");
});
