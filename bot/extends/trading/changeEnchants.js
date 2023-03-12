module.exports = (el) => {
   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {
         let array = [];

         for (let j = 0; j < bot.enchants.usedEnchants.length; j++) {
            array.push(bot.enchants.usedEnchants[j])
         }

         bots[i].changeEnchants(array)
      }
   }
}