
const fuzzy = require('fuzzy');

var list = ['baconing', 'narwhal', 'a mighty bear canoe'];
var results = fuzzy.filter('oe', list)
var matches = results.map(function (x) { return x.string; });
console.log(matches);
// [ 'baconing', 'a mighty bear canoe' ]
