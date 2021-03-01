var express = require("express");
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    //console.log(file);
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
var upload = multer({ storage: storage });


var router = express.Router({
  caseSensitive: true,
});

var ensureToken = require('../../utilities/ensure-token.js');

/**
 *  User Login
 */
// var userLoginCtrl = require('../controllers/user-management/login.js');
// router.post("/login", function (req, res) {
//   return userLoginCtrl.userLogin(req, res);
// });

/**
 *  Get All Cars
 */
var getAllCarsCtrl = require('../controllers/user-management/get-all-cars.js');
router.get("/all", ensureToken, function (req, res) {
  return getAllCarsCtrl.getAllCars(req, res);
});

/**
 *  Get Car By Id
 */
var getCarByIdCtrl = require("../controllers/user-management/get-car-by-id.js");
router.get("/:id", ensureToken, function (req, res) {
  return getCarByIdCtrl.getCarById(req, res);
});

//----------------------------------------------------------------
/**
 *  Create Car
 */
var addNewCarCtrl = require("../controllers/user-management/create-car.js");
router.post("/cars", ensureToken, function (req, res) {
  return addNewCarCtrl.createNewCar(req, res);
});

//----------------------------------------------------------------

//----------------------------------------------------------------
/**
 *  Upload Image Car
 */
var uploadCarImageCtrl = require("../controllers/user-management/upload-car-image.js");
router.post("/upload/:id", ensureToken, upload.single('carpicture'), function (req, res) {
  return uploadCarImageCtrl.uploadCarImage(req, res);
});

//----------------------------------------------------------------

//----------------------------------------------------------------
/**
 *  Update Car
 */
var updateCarCtrl = require("../controllers/user-management/update-car.js");
router.put("/:id", ensureToken, function (req, res) {
  return updateCarCtrl.updateCar(req, res);
});
//----------------------------------------------------------------

//----------------------------------------------------------------
/**
 *  Delete Car
 */
var deleteCarCtrl = require("../controllers/user-management/delete-car.js");
router.delete("/:id", ensureToken, function (req, res) {
  return deleteCarCtrl.deleteCar(req, res);
});

//----------------------------------------------------------------

module.exports = router;