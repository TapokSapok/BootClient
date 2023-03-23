module.exports = (username, server, version) => {

   server = getServer(server);

   const options = {
      username: username,
      host: server[0],
      port: server[1],
      version: version,
   }
   console.log(`Connect ${options.username} \n to ${options.host}:${options.port}`)
   startClient(options)

}