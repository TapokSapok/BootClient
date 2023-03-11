module.exports = (el) => {
   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {
         bots[i].quit();
      } else if (el.dataset.useBot === '.all.') {
         bots[i].quit();
      }
   }
}                 