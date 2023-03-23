module.exports = (el, enchant, lvl, maxPrice) => {
   const index = getActiveBot()

   if (index[0] !== 'console') {
      const obj = {
         enchant: `${enchant}`,
         level: `${lvl}`,
         maxPrice: `${maxPrice}`,
      }
      bots[index[0]].removeEnchant(obj)

   } else if (index[0] === 'console') {
      for (let i = 0; i < bots.length; i++) {
         const obj = {
            enchant: `${enchant}`,
            level: `${lvl}`,
            maxPrice: `${maxPrice}`,
         }

         bots[i].removeEnchant(obj)
      }
   }
}