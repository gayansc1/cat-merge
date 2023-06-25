const { saveImage } = require("../services/image.service");
const catchAsync = require("../utils/catchAsync");

const saveImageContoller = catchAsync(async (req, res) => {
  const result = await saveImage();
  res.status(httpStatus.CREATED).send(result);
});

module.exports = {
  saveImageContoller,
};
