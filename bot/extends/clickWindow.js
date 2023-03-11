module.exports = (el, slot) => {
   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {
         bots[i].clickWindow(slot);
      } else if (el.dataset.useBot === '.all.') {
         bots[i].clickWindow(slot);
      }
   }
}