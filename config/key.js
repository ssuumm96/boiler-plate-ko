if(process.env.NODE_KEY === 'production'){
  module.exports = require('./prod');
}else{
  module.exports = require('./dev');
}
