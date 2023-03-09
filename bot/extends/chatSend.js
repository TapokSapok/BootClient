module.exports = () => {
   if (activeBot === '.all.') {
      bots.forEach(el => el.chatSend(idConsoleChat.value))
      idConsoleChat.value = '';

   } else {
      bots.forEach(el => el.chatSend(idControlChat.value))
      idControlChat.value = '';
   }
}