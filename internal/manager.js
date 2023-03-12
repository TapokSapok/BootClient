module.exports = {
   Bot: require('../bot/bot.js'),
   connect: require('../bot/main/connect.js'),

   chatSend: require('../bot/extends/chatSend.js'),
   quit: require('../bot/extends/quit.js'),
   lookAt: require('../bot/extends/lookAt.js'),
   clickWindow: require('../bot/extends/clickWindow.js'),
   trading: require('../bot/extends/trading/trading.js'),
   enchants: require('../bot/extends/trading/enchants.js'),
   addEnchant: require('../bot/extends/trading/addEnchant.js'),
   removeEnchant: require('../bot/extends/trading/removeEnchant.js')
}