module.exports = (el) => {

   el.style.background = '';
   el.style.color = '';
   el.style.fontWeight = '';
   el.textContent = 'Старт';

   // if (!bots[i].activeTrading) return;

   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {
         bots[i].scriptLog('trading', false)
      }
   }
}