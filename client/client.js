module.exports = class Client {
   constructor(props) {
      this.username = props['username']
      this.panel = props['panel']
      this.chatLog = props['chatLog']

      this.initClient();

   }
   initClient() {
      console.log(clients, bots)
   };
}  