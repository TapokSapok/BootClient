module.exports = (username, text) => {
   const messageChat = document.createElement('li')
   const messageConsole = document.createElement('li')

   if (!text) return

   messageChat.innerText = text;
   messageConsole.innerText = `[${username}]: ${text}`;

   for (let i = 0; i < bots.length; i++) {
      if (bots[i].username === username) {
         bots[i].chatLog.append(messageChat)
         bots[i].chatLog.scrollIntoView(false)
      }
   }

   idConsoleChatLogUl.append(messageConsole)
   idConsoleChatLogUl.scrollIntoView(false)
}