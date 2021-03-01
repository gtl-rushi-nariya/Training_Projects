const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CarDatabase',
  password: '123456',
  port: 5432,
})

//Get All Cars
const getCars = (request, response) => {
  pool.query('SELECT car.name as CarName, model.name as ModelName, make.name as MakerName FROM car JOIN model ON car.modelid = model.id JOIN make ON car.makeid = make.id;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get All Cars with Images
const getCarsWithImages = (request, response) => {
  pool.query('SELECT car.id as id, car.name as CarName, model.name as ModelName,  make.name as MakerName, array_agg(carimage.imagename) as image from car left join carimage on car.id = carimage.carid JOIN model ON car.modelid = model.id  JOIN make ON car.makeid = make.id  GROUP BY car.id ,CarName, ModelName, MakerName order by car.id ;', (error, results) => {
    if (error) {
      throw error
    }
    // console.log('------------------------')
/*
    const updateRows = [];

    // console.log(results.rows)

results.rows.forEach(function(item) {
  var tempArray = updateRows.filter(function(value) {
    return value.id == item.id;
  });
  // console.log(tempArray)
  if (tempArray.length) {
    var matchIndex = updateRows.indexOf(tempArray[0]);
    updateRows[matchIndex].image = updateRows[matchIndex].image.concat(item.image);
  } else {
    if (typeof item.image == 'string')
      item.image = [item.image];
      updateRows.push(item);
  }
});

results.rows = [...updateRows]

    // console.log('------------------------')

    //console.log(results)
*/  
    const temp = results.rows.map((car) => {
      if(car.image[0] != null){
          newImage = car.image.map((image) => {
              return "http://localhost:3000/uploads/images/" + image;
          });
          car.image = [...newImage];
          return car;
      }
      else{
        return car;
      }
    })

    results.rows = [...temp] 
    response.status(200).json(results.rows)
  })
}

//Get Car by Id
const getCarById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT car.name as CarName, model.name as ModelName, make.name as MakerName FROM car JOIN model ON car.modelid = model.id JOIN make ON car.makeid = make.id where car.id = $1;', [id], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  })
}

//Create New Car
const createCar = async (request, response) => {
  let carname = request.body.carname;
  let makename = request.body.makename;
  let modelname = request.body.modelname;
  let modelid;
  let makeid;

   const checkCar = await pool.query('select * from car where name = $1',[carname]);

   if(checkCar.rows.length > 0){
    console.log('car exist')
    response.status(201).send(`car already exists`)
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

   pool.query('insert into car (name, modelid, makeid) values ($1, $2, $3)', [carname, modelid, makeid], (error, results) =>{
     if(error){
       throw error;
     }
     console.log('car added')
     response.status(201).send(`car added successfully`)
   })

  }
}

//Update Car
const updateCar = async (request, response) => {

  const id = parseInt(request.params.id)

  let carname = request.body.carname;
  let makename = request.body.makename;
  let modelname = request.body.modelname;
  let modelid;
  let makeid;

  const checkCar = await pool.query('select * from car where id = $1',[id]);

  if(checkCar.rows.length == 0){
    response.send('Car doesn\'t exist')
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

   pool.query('UPDATE car SET name = $1, modelid = $2, makeid = $3 WHERE id = $4',[carname, modelid, makeid, id],(error, results) =>{
    if(error){
      throw error;
    }
    console.log('car updated')
    response.status(201).send(`car updated successfully`)
   })

  }

}

//Upload Car Image
const uploadCarImage = async (request, response) => {
  const carId = parseInt(request.params.id)
  let createdDate = new Date();
  let imageName = request.file.filename;
  console.log(imageName);

  if (!request.file) {
    res.status(500).send('file not found')
  } 
  
  const checkCar = await pool.query('select * from car where id = $1',[carId]);

  if(checkCar.rows.length == 0){
    response.send('Car doesn\'t exist')
  }
  else{
    pool.query('insert into carimage (imagename, carid, createddate) values ($1, $2, $3)', [imageName, carId, createdDate], (error, results) =>{
      if(error){
        throw error;
      }
      console.log('carImage added')
      response.status(201).send(`carImage added successfully`)
    })

  }
}

const deleteCar = async (request, response) => {

  const carId = parseInt(request.params.id)


  const checkCar = await pool.query('SELECT car.id as id, car.name as CarName, model.name as ModelName,  make.name as MakerName, array_agg(carimage.imagename) as image from car left join carimage on car.id = carimage.carid JOIN model ON car.modelid = model.id  JOIN make ON car.makeid = make.id where car.id = $1 GROUP BY car.id ,CarName, ModelName, MakerName order by car.id;',[carId]);

  if(checkCar.rows.length == 0){
    response.send('Car doesn\'t exist')
  }
  else{

    if(checkCar.rows[0].image[0] != null){

      const checkCar = await pool.query('DELETE FROM carimage WHERE carimage.carid = $1;',[carId]);

    }

    pool.query('DELETE FROM car WHERE car.id= $1; ',[carId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

}


module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  uploadCarImage,
  getCarsWithImages,
  deleteCar
}
