const { firstReq, secondReq, makeRequest } = require("../request");
const { writeFile } = require("fs").promises;
const argv = require("minimist")(process.argv.slice(2));
const { join } = require("path");
const mergeImg = require("merge-img");

const { width = 400 } = argv;

const saveImage = async () => {
  try {
    const firstBody = await makeRequest(firstReq);

    // Check if the first request was successful before proceeding with the merge
    if (firstBody.success) {
      const secondBody = await makeRequest(secondReq);

      // Check if the second request was successful before proceeding with the merge
      if (secondBody.success) {
        mergeAndSaveImages(firstBody.body, secondBody.body, width);
      } else {
        console.log(
          "The second request was unsuccessful. Skipping merge operation."
        );
      }
    } else {
      console.log(
        "The first request was unsuccessful. Skipping merge operation."
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const mergeAndSaveImages = (firstImage, secondImage, width) => {
  mergeImg([
    { src: new Buffer(firstImage, "binary"), x: 0, y: 0 },
    { src: new Buffer(secondImage, "binary"), x: width, y: 0 },
  ]).then((img) => {
    img.getBuffer("image/jpeg", (err, buffer) => {
      if (err) {
        console.log(err);
        return;
      }

      const fileOut = join(process.cwd(), `/cat-card.jpg`);

      writeFile(fileOut, buffer, "binary")
        .then(() => {
          console.log("---saved");
        })
        .catch((err) => {
          console.log("---err", err);
        });
    });
  });
};

module.exports = {
  saveImage,
};
