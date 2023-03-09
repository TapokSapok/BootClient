module.exports = (username, host, port, version) => {
   const options = {
      username: username,
      host: host,
      port: port,
      version: version,
   }
   console.log(`Connect ${options.username} \n to ${options.host}:${options.port}`)
   startClient(options)
}