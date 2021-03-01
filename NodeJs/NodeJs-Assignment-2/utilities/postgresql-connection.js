const { Pool } = require('pg')
var HttpStatusCode = require("http-status-codes");

var settings = require("../config.js");

async function getResult(sqlQuery) {
  var res = await getResultArray(sqlQuery) // a is 5
  return res;
}

async function getResultArray(sqlQuery){ 
  return new Promise(function (resolve, reject) {
      pool = new Pool({
      user: settings.dbConnection.user,
      host: settings.dbConnection.host,
      database: settings.dbConnection.database,
      password: settings.dbConnection.password,
      port: settings.dbConnection.port,
    });

    return pool.query(sqlQuery, (err, result) => { 

      if (result.rows.length > 0) {
        //----------------------
        //------------------------

        return resolve({
          status: HttpStatusCode.StatusCodes.OK,
          data: result.rows
        });
      } else { 
        return resolve({
          status: HttpStatusCode.StatusCodes.OK,
          data: []
        });
      }        
    })

  });
  
}

// async function checkRecord(carname, modelname, makename) {
//   var res = await checkCarExist(carname, modelname, makename);// a is 5
//   return res;
// }

async function insertCar(carname, modelid, makeid){ 
  return new Promise(function (resolve, reject) {
      pool = new Pool({
      user: settings.dbConnection.user,
      host: settings.dbConnection.host,
      database: settings.dbConnection.database,
      password: settings.dbConnection.password,
      port: settings.dbConnection.port,
    });

    return pool.query('insert into car (name, modelid, makeid) values ($1, $2, $3)', [carname, modelid, makeid], (err, result) => { 

        return resolve({
          status: HttpStatusCode.StatusCodes.OK,
          data: 'result.rows'
        });
        // return resolve({
        //   status: HttpStatusCode.StatusCodes.OK,
        //   data: []
        // });
    })

  });
  
}

async function checkCarExist(carname, modelname, makename){
  return new Promise(async function(resolve, reject){

    pool = new Pool({
      user: settings.dbConnection.user,
      host: settings.dbConnection.host,
      database: settings.dbConnection.database,
      password: settings.dbConnection.password,
      port: settings.dbConnection.port,
    });

    let modelid;
    let makeid;

    const checkCar = await pool.query('select * from car where name = $1',[carname]);

    if(checkCar.rows.length > 0){
     console.log('car exist');

     return resolve({
      status: HttpStatusCode.StatusCodes.OK,
      data: []
    });

    }
    else{
 
     const checkModel = await pool.query('select * from model where name = $1',[modelname]);
     const checkMake = await pool.query('select * from make where name = $1',[makename]);
 
     if(checkModel.rows.length > 0){
       modelid = checkModel.rows[0].id;
       console.log('model exists id :' + modelid)
     }
     else{
       const newModel = await pool.query('insert into model (name) values ($1)',[modelname]);
       const newmodelid = await pool.query('select * from model where name = $1',[modelname]);
       modelid = newmodelid.rows[0].id;
       console.log('new model id :' + modelid)
     }
 
     if(checkMake.rows.length > 0){
       makeid = checkMake.rows[0].id;
       console.log('make exists id :' + makeid)
 
     }
     else{
       const newMake = await pool.query('insert into make (name) values ($1)',[makename]);
       const newmakeid = await pool.query('select * from make where name = $1',[makename]);
       makeid = newmakeid.rows[0].id;
       console.log('new make id :' + makeid)
    }
    
    return resolve({
      status: HttpStatusCode.StatusCodes.OK,
      data: [modelid, makeid]
    });

    // pool.query('insert into car (name, modelid, makeid) values ($1, $2, $3)', [carname, modelid, makeid], (error, results) =>{
    //   if(error){
    //     throw error;
    //   }
    //   console.log('car added')
    //   response.status(201).send(`car added successfully`)
    // })
 
   }

  });
}

async function updateCar(carname, modelid, makeid, carid){ 
  return new Promise(function (resolve, reject) {
      pool = new Pool({
      user: settings.dbConnection.user,
      host: settings.dbConnection.host,
      database: settings.dbConnection.database,
      password: settings.dbConnection.password,
      port: settings.dbConnection.port,
    });

    return pool.query('UPDATE car SET name = $1, modelid = $2, makeid = $3 WHERE id = $4',[carname, modelid, makeid, carid], (err, result) => { 

        return resolve({
          status: HttpStatusCode.StatusCodes.OK,
          data: 'result.rows'
        });
        // return resolve({
        //   status: HttpStatusCode.StatusCodes.OK,
        //   data: []
        // });
    })

  });
  
}


async function checkUpdateCar(carid, modelname, makename){
  return new Promise(async function(resolve, reject){

    pool = new Pool({
      user: settings.dbConnection.user,
      host: settings.dbConnection.host,
      database: settings.dbConnection.database,
      password: settings.dbConnection.password,
      port: settings.dbConnection.port,
    });

    let modelid;
    let makeid;

    const checkCar = await pool.query('select * from car where id = $1',[carid]);

    if(checkCar.rows.length == 0){

      console.log('car doesn\'t exist');

     return resolve({
      status: HttpStatusCode.StatusCodes.OK,
      data: []
    });
    }
    else{
  
      const checkModel = await pool.query('select * from model where name = $1',[modelname]);
      const checkMake = await pool.query('select * from make where name = $1',[makename]);
  
      if(checkModel.rows.length > 0){
        modelid = checkModel.rows[0].id;
        console.log('model exists id :' + modelid)
      }
      else{
        const newModel = await pool.query('insert into model (name) values ($1)',[modelname]);
        const newmodelid = await pool.query('select * from model where name = $1',[modelname]);
        modelid = newmodelid.rows[0].id;
        console.log('new model id :' + modelid)
      }
  
      if(checkMake.rows.length > 0){
        makeid = checkMake.rows[0].id;
        console.log('make exists id :' + makeid)
  
      }
      else{
        const newMake = await pool.query('insert into make (name) values ($1)',[makename]);
        const newmakeid = await pool.query('select * from make where name = $1',[makename]);
        makeid = newmakeid.rows[0].id;
        console.log('new make id :' + makeid)
     }

     return resolve({
      status: HttpStatusCode.StatusCodes.OK,
      data: [modelid, makeid]
    });
  
    //  pool.query('UPDATE car SET name = $1, modelid = $2, makeid = $3 WHERE id = $4',[carname, modelid, makeid, id],(error, results) =>{
    //   if(error){
    //     throw error;
    //   }
    //   console.log('car updated')
    //   response.status(201).send(`car updated successfully`)
    //  })
  
    }

  });
}


async function uploadCarImage(carId, imageName){
  return new Promise(async function(resolve, reject){

    pool = new Pool({
      user: settings.dbConnection.user,
      host: settings.dbConnection.host,
      database: settings.dbConnection.database,
      password: settings.dbConnection.password,
      port: settings.dbConnection.port,
    });

    let createdDate = new Date();

    console.log(imageName);
    

    const checkCar = await pool.query('select * from car where id = $1',[carId]);

    if(checkCar.rows.length == 0){

      return resolve({
        status: HttpStatusCode.StatusCodes.OK,
        data: []
      });
      
    }
    else{
      pool.query('insert into carimage (imagename, carid, createddate) values ($1, $2, $3)', [imageName, carId, createdDate], (error, results) =>{
        if(error){
          throw error;
        }
        console.log('carImage added')

        return resolve({
          status: HttpStatusCode.StatusCodes.CREATED,
          data: [imageName]
        });

      })

    }

  });
}

async function deleteCarById(carId){
  return new Promise(async function(resolve, reject){

    pool = new Pool({
      user: settings.dbConnection.user,
      host: settings.dbConnection.host,
      database: settings.dbConnection.database,
      password: settings.dbConnection.password,
      port: settings.dbConnection.port,
    });
    

    const checkCar = await pool.query('SELECT car.id as id, car.name as CarName, model.name as ModelName,  make.name as MakerName, array_agg(carimage.imagename) as image from car left join carimage on car.id = carimage.carid JOIN model ON car.modelid = model.id  JOIN make ON car.makeid = make.id where car.id = $1 GROUP BY car.id ,CarName, ModelName, MakerName order by car.id;',[carId]);

    if(checkCar.rows.length == 0){

      console.log('car doesn\'t exists')

      return resolve({
        status: HttpStatusCode.StatusCodes.OK,
        data: []
      });

    }
    else{
      
      if(checkCar.rows[0].image[0] != null){

        console.log('car image exist')

        const checkCar = await pool.query('DELETE FROM carimage WHERE carimage.carid = $1;',[carId]);
  
        console.log('car image deleted')


      }
      
      pool.query('DELETE FROM car WHERE car.id= $1; ',[carId], (error, results) => {
        if (error) {
          throw error
        }

        console.log('carImage deleted')

        return resolve({
          status: HttpStatusCode.StatusCodes.OK,
          data: ['success']
        });

      })

    }

  });
}


module.exports = {
  getResult,
  checkCarExist,
  insertCar,
  checkUpdateCar,
  updateCar,
  uploadCarImage,
  deleteCarById
}