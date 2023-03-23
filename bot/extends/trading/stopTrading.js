module.exports = (el) => {
   const index = getActiveBot()

   el.style.background = '';
   el.style.color = '';
   el.style.fontWeight = '';
   el.textContent = 'Старт';

   if (index[0] !== 'console') {
      bots[index[0]].scriptLog('trading', false)
   } else if (index[0] === 'console') {
      for (let i = 0; i < bots.length; i++) {
         bots[i].scriptLog('trading', false)
      }
   }
}