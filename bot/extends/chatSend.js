module.exports = (el) => {

   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {

         bots[i].chatSend(el.value);
         el.value = '';

      } else if (el.dataset.useBot === '.all.') {

         for (let j = 0; j < bots.length; j++) {
            bots[j].chatSend(el.value);
         }
         el.value = '';
      }
   }


}