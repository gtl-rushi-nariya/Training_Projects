var HttpStatusCode = require("http-status-codes");
var dbConnection = require('../../../utilities/postgresql-connection.js');
var imageUrlConfig = require('../../../config.js');

exports.uploadCarImage = function (req, res) {
    var entityData = {
        Id: req.params.id
    };

    function validateFields(req, res) {
        return new Promise(function (resolve, reject) {
            
            return resolve({
                status: HttpStatusCode.StatusCodes.OK,
                data: entityData
            });
        });
    }

    function uploadCarImage(req, entityData) {
        return new Promise(function (resolve, reject) {

            if (!req.file) {

                return resolve({
                  status: HttpStatusCode.StatusCodes.INTERNAL_SERVER_ERROR,
                  data: []
                });
          
              } 

            let imageName = req.file.filename;

            dbConnection.uploadCarImage(entityData.Id, imageName).then(function (response) {
                if (response.data[0] != null) {

                    return resolve({
                        status: HttpStatusCode.StatusCodes.OK,
                        data: response,
                        message: 'Image uploaded successfully!!!'
                    });
                    
                } else {
                    return resolve({
                        status: HttpStatusCode.StatusCodes.OK,
                        data: [],
                        message: 'Car doesn\'t Exist!!!'
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

            // //---------------------
            // // check if car exists or not

            // let carname = req.body.carname;
            // let makename = req.body.makename;
            // let modelname = req.body.modelname;
            // let modelid;
            // let makeid;

            //  const checkCar = await pool.query('select * from car where name = $1',[carname]);

            //  if(checkCar.rows.length > 0){
            //   console.log('car exist')
            //   response.status(201).send(`car already exists`)
            //  }
            //  else{
            
            //   const checkModel = await pool.query('select * from model where name = $1',[modelname]);
            //   const checkMake = await pool.query('select * from make where name = $1',[makename]);
            
            //   if(checkModel.rows.length > 0){
            //     modelid = checkModel.rows[0].id;
            //     console.log('model exists id :' + modelid)
            //   }
            //   else{
            //     const newModel = await pool.query('insert into model (name) values ($1)',[modelname]);
            //     const newmodelid = await pool.query('select * from model where name = $1',[modelname]);
            //     modelid = newmodelid.rows[0].id;
            //     console.log('new model id :' + modelid)
            //   }
          
            //   if(checkMake.rows.length > 0){
            //     makeid = checkMake.rows[0].id;
            //     console.log('make exists id :' + makeid)

            //   }
            //   else{
            //     const newMake = await pool.query('insert into make (name) values ($1)',[makename]);
            //     const newmakeid = await pool.query('select * from make where name = $1',[makename]);
            //     makeid = newmakeid.rows[0].id;
            //     console.log('new make id :' + makeid)
            //  }
            //---------------------

            // const sqlQuery = `insert into car (name, modelid, makeid) values (${carname}, ${modelid}, ${makeid});`;
            
            // dbConnection.getResult(sqlQuery).then(function (response) {
            //     if (response.data.length > 0) {

            //         const temp = response.data.map((car) => {
            //             if(car.image[0] != null){
            //                 newImage = car.image.map((image) => {
            //                     return imageUrlConfig.imageURL.url + image;
            //                 });
            //                 car.image = [...newImage];
            //                 return car;
            //             }
            //             else{
            //               return car;
            //             }
            //           })
                  
            //           response.data = [...temp] 
                    
            //         return resolve({
            //             status: HttpStatusCode.StatusCodes.OK,
            //             data: response,
            //             message: 'Record listed successfully!!!'
            //         });
            //     } else {
            //         return resolve({
            //             status: HttpStatusCode.StatusCodes.OK,
            //             data: [],
            //             message: 'No record found!!!'
            //         });
            //     }                
            // })
            // .catch(function (error) {
            //     res.status(error.status).json({
            //         data: error.data
            //     });
            // });


    validateFields(req, res).then(function (response) {
        uploadCarImage(req, response.data).then(function (response) {
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