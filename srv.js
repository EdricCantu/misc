var static = require('node-static');
var fileServer = new static.Server("./"+process.argv[2], {cache: false});
require('http').createServer(async(req,res)=>{
  req.addListener('end', function () {
    fileServer.serve(req, res);
  }).resume();
}).listen(8080);
