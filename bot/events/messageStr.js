module.exports = (text) => {
   const message = document.createElement('li')

   message.innerText = text;
   // idControlChatLogUl.append(message)
   // idControlChatLogUl.scrollIntoView(false)



   for (let j = 0; j < clients.length; j++) {
      for (let i = 0; i < bots.length; i++) {
         if (clients[j].username === bots[i].username) {
            clients[j].chatLog.append(message)
            // clients[j].chatLog.scrollIntoView(false)
            console.log(bots[i].username, clients[j].chatLog)
         }

      }

   }
}