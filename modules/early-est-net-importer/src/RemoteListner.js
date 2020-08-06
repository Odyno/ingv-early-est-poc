const axios = require("axios");


module.exports.poll = function(fn, timeout, interval) {
  const endTime = Number(new Date()) + (timeout || 2000);
  interval = interval || 100;

  const checkCondition = (resolve, reject) => {
    let ajax = fn();
    ajax.then(response => {
      if (response.statusText === "OK") {
        resolve(response.data);
      } else if (Number(new Date()) < endTime) {
        setTimeout(checkCondition, interval, resolve, reject);
      } else {
        reject(new Error("time out for " + fn + " : " + arguments));
      }
    });
  };
  return new Promise(checkCondition);
};

module.exports.startContinuePool = function(url, timeout, callback) {
    return setInterval(() => {
        axios.get(url).then(function(response) {
          if (response.statusText === "OK") {
            callback(null,response.data)
          } else {
            callback(new Error("time out for " + url + " : " + arguments))
          }
        });
      }, timeout);
};
