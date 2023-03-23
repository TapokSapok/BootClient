module.exports = (el, type, player) => {
   const index = getActiveBot()

   if (index[0] !== 'console') {
      bots[index[0]].lookAt(type, player);
   } else if (index[0] === 'console') {
      for (let i = 0; i < bots.length; i++) {
         bots[i].lookAt(type, player);
      }
   }
}