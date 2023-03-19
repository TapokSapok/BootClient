module.exports = (el, enchant, lvl, maxPrice) => {

   for (let i = 0; i < bots.length; i++) {

      if (el.dataset.useBot === bots[i].username) {

         const obj = {
            enchant: `${enchant}`,
            level: `${lvl}`,
            maxPrice: `${maxPrice}`,
         }

         bots[i].removeEnchant(obj)
      }
   }
}