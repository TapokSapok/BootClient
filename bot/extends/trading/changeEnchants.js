module.exports = (el) => {
   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {

         const enchants = bot.enchants
         console.log(enchants)

         for (let j = 0; j < bot.enchants.usedEnchants; j++) {
            console.log('1')
            console.log(bot.enchants.usedEnchants[j])
         }


      }
   }
}