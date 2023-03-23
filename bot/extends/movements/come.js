module.exports = (el, player) => {
   const index = getActiveBot()

   if (index[0] !== 'console') {
      bots[index[0]].comePlayer(player)
   } else if (index[0] === 'console') {
      for (let i = 0; i < bots.length; i++) {
         bots[i].comePlayer(player)
      }
   }
}