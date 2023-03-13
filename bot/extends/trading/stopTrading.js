module.exports = (el) => {
   el.style.background = '';
   el.style.color = '';
   el.style.fontWeight = '';
   el.textContent = 'Старт';


   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {
         bots[i].scriptLog('trading', false)
      }
   }
}