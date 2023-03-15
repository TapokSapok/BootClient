module.exports = (el, player) => {
   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {

         bots[i].comePlayer(player)
      }
   }
}