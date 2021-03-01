const add = (a) => a+1;

console.log(add(1,2));


const hobbies = ['sports', 'cookings'];

let [ hobby ] = hobbies;

const newHobbies = hobbies.map(hobby =>  'hobby: ' + hobby );

console.log(hobby);

console.log('----------------');


var array = [{
    name: "foo1",
    value: "val1"
  }, {
    name: "foo1",
    value:"val2"
  }, {
    name: "foo2",
    value: "val4"
  },
  {
    name: "foo2",
    value: "val5"
  }];

console.log(array);

var output = [];

array.forEach(function(item) {
  var existing = output.filter(function(v) {
    return v.name == item.name;
  });
  console.log(existing)
  if (existing.length) {
    var existingIndex = output.indexOf(existing[0]);
    output[existingIndex].value = output[existingIndex].value.concat(item.value);
  } else {
    if (typeof item.value == 'string')
      item.value = [item.value];
    output.push(item);
  }
});

  console.log('----------------------------hiii');
  console.log(output);
