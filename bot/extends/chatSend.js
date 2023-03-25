module.exports = (el) => {
   const index = getActiveBot();

   if (index[0] !== 'console') {

      bots[index[0]].chatSend(el.value);
      el.value = '';

   } else if (index[0] === 'console') {

      for (let i = 0; i < bots.length; i++) {
         bots[i].chatSend(el.value);
      }
      el.value = '';
   }
}