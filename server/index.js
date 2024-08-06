const app = require('../app');
const port = "5950"

const server = app.listen(port);
console.log('App is ready to use. running on port : ' + port);