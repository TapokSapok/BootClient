module.exports = (el) => {
   const index = getActiveBot()

   if (index[0] !== 'console') {
      bots[index[0]].activeTrading = !bots[index[0]].activeTrading;
      console.log('Traiding ', bots[index[0]].activeTrading);

      if (bots[index[0]].activeTrading) {
         el.style.background = 'red';
         el.textContent = 'Стоп';
         el.style.color = 'black';
         el.style.fontWeight = '600';
      } else {
         el.style.background = '';
         el.style.color = '';
         el.style.fontWeight = '';
         el.textContent = 'Старт';
      }

      bots[index[0]].scriptLog('trading', bots[index[0]].activeTrading)
      bots[index[0]].trading();

   } else if (index[0] === 'console') {
      for (let i = 0; i < bots.length; i++) {

         bots[i].activeTrading = !bots[i].activeTrading;
         console.log('Traiding ', bots[i].activeTrading);

         if (bots[i].activeTrading) {
            el.style.background = 'red';
            el.textContent = 'Стоп';
            el.style.color = 'black';
            el.style.fontWeight = '600';
         } else {
            el.style.background = '';
            el.style.color = '';
            el.style.fontWeight = '';
            el.textContent = 'Старт';
         }

         bots[i].scriptLog('trading', bots[i].activeTrading)
         bots[i].trading();
      }
   }
}


