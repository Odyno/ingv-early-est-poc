function log(id, message) {
  // $(id).append('<input readonly type="text" class="item" value=\''+message+'\' />');
  // "#rawMessages"

  // Element into which appending will be done
  var element = document.querySelector(id);

  // The HTML string to be appended
  var html =
    '<input readonly type="text" class="item" value=\'' + message + "' />";

  // Append
  element.insertAdjacentHTML("beforebegin", html);
}

var socket = io();
var rawMessageCount = 0;
var messageCount = 0;
socket.on("rawMessage", function(msg) {
  rawMessageCount++;
  log("#rawMessages", rawMessageCount + " - " + msg);
});

socket.on("eventMessage", function(msg) {
  document.getElementById("eventMessage").insertAdjacentHTML("afterbegin", msg);
});

socket.on("totMessage", function(msg) {
  document.getElementById("totMessageEvent").innerHTML = msg;
});

socket.on("msgWithEvent", function(msg) {
  document.getElementById("numMessageWithEvent").innerHTML = msg;
});
