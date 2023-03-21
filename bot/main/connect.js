module.exports = (username, server, version) => {

   const index = server.indexOf(':')

   let host = '';
   let port = '';

   if (index !== -1) {
      port = server.slice(index + 1, server.length)
      host = server.slice(0, index)
   } else {
      host = server;
   }

   const options = {
      username: username,
      host: host,
      port: +port,
      version: version,
   }

   console.log(`Connect ${options.username} \n to ${options.host}:${options.port}`)
   startClient(options)
}