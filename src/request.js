const request = require("request-promise-native");
const argv = require("minimist")(process.argv.slice(2));

const {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = argv;

const firstReq = {
  url: `https://cataas.com/cat/says/${greeting}?width=${width}&height=${height}&color=${color}&s=${size}`,
  encoding: "binary",
};

const secondReq = {
  url: `https://cataas.com/cat/says/${who}?width=${width}&height=${height}&color=${color}&s=${size}`,
  encoding: "binary",
};

const makeRequest = async (reqOptions) => {
  return request
    .get(reqOptions)
    .then((body) => {
      return { body, success: true };
    })
    .catch((error) => {
      console.error(error);
      return { success: false };
    });
};

module.exports = {
  firstReq,
  secondReq,
  makeRequest,
};
