const path = require('path')
let DIRNAME = path.join(__dirname);

if (DIRNAME.includes('app.asar')) {
   DIRNAME = path.join(__dirname + '../../../')
}
module.exports = DIRNAME