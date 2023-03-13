module.exports = (el) => {
   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {

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


