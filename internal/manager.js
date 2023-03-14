module.exports = {

   // MAIN
   Bot: require('../bot/bot.js'),
   client: require('../bot/client.js'),
   connect: require('../bot/main/connect.js'),

   // EVENTS
   spawn: require('../bot/events/spawn.js'),

   // ADDONS
   chatSend: require('../bot/extends/chatSend.js'),
   quit: require('../bot/extends/quit.js'),
   lookAt: require('../bot/extends/lookAt.js'),
   clickWindow: require('../bot/extends/clickWindow.js'),

   // TRADING
   StartTrading: require('../bot/extends/trading/StartTrading.js'),
   stopTrading: require('../bot/extends/trading/stopTrading.js'),
   enchants: require('../bot/extends/trading/enchants.js'),
   addEnchant: require('../bot/extends/trading/addEnchant.js'),
   removeEnchant: require('../bot/extends/trading/removeEnchant.js'),
}