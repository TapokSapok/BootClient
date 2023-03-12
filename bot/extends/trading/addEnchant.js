module.exports = (el, enchant, lvl, maxPrice) => {

   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {
         let obj = {}

         for (let j = 0; j < bot.enchants.enchants.length; j++) {
            if (enchant === bot.enchants.enchants[j].id) {

               obj = {
                  enchant: `${enchant}`,
                  level: `${lvl}`,
                  maxPrice: `${maxPrice}`
               }
               console.log(obj)
               bots[i].addEnchant(obj)
            }
         }
      }
   }
}