var StatusCode = require('http-status-codes');
var dbConnection = require('../../../utilities/postgresql-connection.js');
var settings = require('../../../config.js');
var validate = require('validator');
var HttpStatusCode = require("http-status-codes");
var imageUrlConfig = require('../../../config.js');

exports.getCarById = function (req, res) {
    var entityData = {
        Id: req.params.id
    };

    function validateFields(req, res) {
        return new Promise(function (resolve, reject) {
            var isUserIdEmpty = validate.isEmpty(entityData.Id);
            if (isUserIdEmpty) {
                return resolve({
                    status: HttpStatusCode.StatusCodes.BAD_REQUEST,
                    result: req.i18n.__('UserIdRequired')
                });
                //return res.status(400).send({ result: req.i18n.__('UserIdRequired') });
            }
            
            return resolve({
                status: HttpStatusCode.StatusCodes.OK,
                data: entityData
            });
        });
    }

    function getCarById(req, entityData) {
        return new Promise(function (resolve, reject) {
            const sqlQuery = `SELECT car.id as id, car.name as CarName, model.name as ModelName,  make.name as MakerName, array_agg(carimage.imagename) as image from car left join carimage on car.id = carimage.carid JOIN model ON car.modelid = model.id  JOIN make ON car.makeid = make.id where car.id = ${entityData.Id} GROUP BY car.id ,CarName, ModelName, MakerName order by car.id;`;
            dbConnection.getResult(sqlQuery).then(function (response) {
                if (response.data.length > 0) {

                    const temp = response.data.map((car) => {
                        if(car.image[0] != null){
                            newImage = car.image.map((image) => {
                                return imageUrlConfig.imageURL.url + image;
                            });
                            car.image = [...newImage];
                            return car;
                        }
                        else{
                          return car;
                        }
                      })
                  
                      response.data = [...temp] 

                    return resolve({
                        status: HttpStatusCode.StatusCodes.OK,
                        data: response,
                        message: 'Record listed successfully!!!'
                    });
                } else {
                    return resolve({
                        status: HttpStatusCode.StatusCodes.OK,
                        data: [],
                        message: 'No record found!!!'
                    });
                }                
            })
            .catch(function (error) {
                res.status(error.status).json({
                    data: error.data
                });
            });
        });
    }

    validateFields(req, res).then(function (response) {
        getCarById(req, response.data).then(function (response) {
            res.status(response.status).json({
                data: response.data.data,
                message: response.message
            });
        })
        .catch(function (error) {
            res.status(error.status).json({
                data: error.data
            });
        });
    })
    .catch(function (error) {
        res.status(error.status).json({
            data: error.data
        });
    });
    
}