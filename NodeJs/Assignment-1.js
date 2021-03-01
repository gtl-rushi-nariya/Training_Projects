 // 1. Creating Car Array.
 const cars = [{
     carName : "abc1",
     carModel : "xyz1",
     ManufactoringYear : 2010,
     price : 29,
     lastServiceDate :  new Date("August 15, 2011 10:05:00")
 },
 {
    carName : "abc2",
    carModel : "xyz2",
    ManufactoringYear : 2011,
    price : 29,
    lastServiceDate :  new Date("August 15, 2012 10:05:00")
},{
    carName : "abc3",
    carModel : "xyz3",
    ManufactoringYear : 2018,
    price : 29,
    lastServiceDate :  new Date("August 15, 2019 10:05:00")
},
{
    carName : "abc4",
    carModel : "xyz4",
    ManufactoringYear : 2010,
    price : 29,
    lastServiceDate :  new Date("August 15, 2011 10:05:00")
},
{
    carName : "abc5",
    carModel : "xyz5",
    ManufactoringYear : 2002,
    price : 29,
    lastServiceDate :  new Date("August 15, 2019 10:05:00")
},
{
    carName : "abc6",
    carModel : "xyz6",
    ManufactoringYear : 2014,
    price : 29,
    lastServiceDate :  new Date("August 15, 2015 10:05:00")
},
{
   carName : "abc7",
   carModel : "xyz7",
   ManufactoringYear : 2010,
   price : 29,
   lastServiceDate :  new Date("August 15, 2011 10:05:00")
},{
   carName : "abc8",
   carModel : "xyz8",
   ManufactoringYear : 2010,
   price : 29,
   lastServiceDate :  new Date("August 15, 2012 10:05:00")
},
{
   carName : "abc9",
   carModel : "xyz9",
   ManufactoringYear : 2015,
   price : 29,
   lastServiceDate :  new Date("August 15, 2020 10:05:00")
},
{
   carName : "abc10",
   carModel : "xyz10",
   ManufactoringYear : 2017,
   price : 29,
   lastServiceDate :  new Date("August 15, 2018 10:05:00")
}];

// 2. Get total Car count.
 console.log('Count : ' +cars.length);

// 3. Filter array with carName, carModel, manufactoringYear.
let searchCar = "abc3";
let searchCarModel = "xyz3";
let searchYear = 2015;

 if(cars.find(x => x.carName === searchCar && x.carModel === searchCarModel && x.ManufactoringYear > searchYear)){
    console.log(searchCar + ' car Found');
 }
 else{
    console.log(searchCar + ' car Not Found');
 }

 // 4. Print current date and time.
 let currentDateTime = new Date();

 console.log('Current Date and Time : ' + currentDateTime);

 //5. Print last month date from current date.
 const lastMonthDate = new Date( currentDateTime.setMonth(currentDateTime.getMonth()-1));

 console.log('Last Month Date form Current Date : ' + lastMonthDate);

// 6. Print last date of next month date from current date.
 currentDateTime = new Date();
 const lastDateOfNextMonth = new Date(currentDateTime.setMonth(currentDateTime.getMonth()+2, 0));

 console.log('Last Date of Next Month from Current Date : ' + lastDateOfNextMonth);

