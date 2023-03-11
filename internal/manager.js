module.exports = {
   Bot: require('../bot/bot.js'),
   connect: require('../bot/main/connect.js'),

   chatSend: require('../bot/extends/chatSend.js'),
   quit: require('../bot/extends/quit.js'),
   lookAt: require('../bot/extends/lookAt.js'),
   clickWindow: require('../bot/extends/clickWindow.js'),
   trading: require('../bot/extends/trading.js')
}