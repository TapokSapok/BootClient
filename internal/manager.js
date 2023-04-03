module.exports = {

   // MAIN
   Bot: require('../bot/bot.js'),
   client: require('../bot/client.js'),
   connect: require('../bot/main/connect.js'),
   getColor: require('../bot/main/getColor.js'),

   // EVENTS
   spawn: require('../bot/events/spawn.js'),
   messageStr: require('../bot/events/messageStr.js'),

   // ADDONS
   chatSend: require('../bot/extends/chatSend.js'),
   quit: require('../bot/extends/quit.js'),
   lookAt: require('../bot/extends/lookAt.js'),
   clickWindow: require('../bot/extends/clickWindow.js'),
   autoclicker: require('../bot/extends/autoclicker.js'),
   chatMiddleware: require('../bot/main/chatMiddleware.js'),
   autoEat: require('../bot/extends/autoEat.js'),

   comePlayer: require('../bot/extends/movements/come.js'),
   followPlayer: require('../bot/extends/movements/follow.js'),
   stopFollowPlayer: require('../bot/extends/movements/stopFollow.js'),

   // TRADING
   StartTrading: require('../bot/extends/trading/StartTrading.js'),
   stopTrading: require('../bot/extends/trading/stopTrading.js'),
   enchants: require('../bot/extends/trading/enchants.js'),
   addEnchant: require('../bot/extends/trading/addEnchant.js'),
   removeEnchant: require('../bot/extends/trading/removeEnchant.js'),
}