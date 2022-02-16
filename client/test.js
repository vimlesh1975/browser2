const jwt = require('jsonwebtoken');

var token = jwt.sign({ UserName: 'vimlesh.75@gov.in' }, 'superSecret');
console.log(token);

const aa = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjIxODQzNjl9.NTs6Wdg24ZQIzB62KkykbIX2ZV0rixEu6q8Q6Y7vvvg', 'superSecret');
console.log(aa.iat);