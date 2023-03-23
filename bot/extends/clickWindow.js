module.exports = (el, slot) => {
   const index = getActiveBot()

   if (index[0] !== 'console') {
      bots[index[0]].clickWindow(slot);
   } else if (index[0] === 'console') {
      for (let i = 0; i < bots.length; i++) {
         bots[i].clickWindow(slot);
      }
   }
}