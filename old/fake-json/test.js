var FakeJson = require('fake-json');

var schema = {
  "type": "array",
  "items": {
    "type": "number",
    "minimum": 1,
    "maximum": 100
  },
  "minItems": 5,
  "maxItems": 10
};

console.log('start');
var generator = new FakeJson(schema);
var a = generator.generate(); // => [ 6, 10, 7 ]
console.log(a);
