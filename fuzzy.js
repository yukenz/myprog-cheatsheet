
const fuzzy = require('fuzzy');

var list = ['baconing', 'narwhal', 'a mighty bear canoe'];
var results = fuzzy.filter('oe', list)
var matches = results.map(function (el) { return el.string; });
console.log(matches);
// [ 'baconing', 'a mighty bear canoe' ]