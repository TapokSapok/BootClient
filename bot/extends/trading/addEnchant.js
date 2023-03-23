module.exports = (el, enchant, lvl, maxPrice, displayName) => {
   const index = getActiveBot()

   if (index[0] !== 'console') {
      let obj = {}

      for (let j = 0; j < bot.enchants.enchants.length; j++) {
         if (enchant === bot.enchants.enchants[j].id) {

            obj = {
               enchant: `${enchant}`,
               level: `${lvl}`,
               maxPrice: `${maxPrice}`,
               displayName: `${displayName}`
            }
            console.log(obj)
            bots[index[0]].addEnchant(obj)
         }
      }
   } else if (index[0] === 'console') {
      for (let i = 0; i < bots.length; i++) {
         let obj = {}

         for (let j = 0; j < bot.enchants.enchants.length; j++) {
            if (enchant === bot.enchants.enchants[j].id) {

               obj = {
                  enchant: `${enchant}`,
                  level: `${lvl}`,
                  maxPrice: `${maxPrice}`,
                  displayName: `${displayName}`
               }
               console.log(obj)
               bots[i].addEnchant(obj)
            }
         }
      }
   }
}