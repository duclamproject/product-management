const uploadToCloudinary = require("../../helpers/uploadToCloudinary");

module.exports.upload = async (req, res, next) => {
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    console.log(result);
    req.body[req.file.fieldname] = result;
  }
  next();
};
