//s3 multer
const multer = require("multer");
const aws = require("aws-sdk");
var multerS3 = require("multer-s3-v2");
const path = require("path");
var request = require("request");
var axios = require("axios");

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.DEFAULT_REGION,
});

const s3 = new aws.S3();

let bucketName = "property16777";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

//delete file from s3 by link
async function deleteFile(link) {
  console.log(link);
  const params = {
    Bucket: bucketName,
    Key: link,
  };
  await s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

//send otp to user
async function sendOtp(phone, otp, name) {
  // var options = { method: 'GET',
  // url: 'https://api.authkey.io/request',
  // qs:
  // { authkey: "4b0f1721063365b3",
  // sms: `Your OTP is ${otp}`,
  // mobile: phone,
  //   country_code: '91' ,
  //   sender: '1234567' },

  // };

  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);
  //   console.log(body);
  // });

  try {
    await axios.get(
      `https://api.authkey.io/request?authkey=4b0f1721063365b3&mobile=${phone}&country_code=91&sid=5663&name=${name}&otp=${otp}`
    );
  } catch (error) {
    console.log(error);
  }

  // // https://api.authkey.io/request?authkey=AUTHKEY&mobile=RecepientMobile&country_code=CountryCode&sid=1001&name=Twinkle&otp=1234
}

module.exports = { upload, deleteFile, sendOtp };

//end s3 multer
//end of file
