
module.exports = class Bot {
   constructor(options) {
      this.username = options['username'];
      this.host = options['host'];
      this.port = options['port'];

      this.panel = null;
      this.chatLog = null;

      this.initBot();
   }

   // === Инициализация бота
   initBot() {
      this.bot = mineflayer.createBot({
         'username': this.username,
         'host': this.host,
         'port': this.port,
      })
      this.initEvents()
   }

   // === Инициализция ивентов бота
   initEvents() {
      this.bot.on("messagestr", (text) => {
         const func = require('./events/messageStr.js');
         func(this.username, text);
      })

      this.bot.on('health', () => {
         if (this.bot.username === activeBot) {
            idNavHealth.innerText = `${this.bot.health.toFixed(0)} Health`
            idNavHunger.innerText = `${this.bot.food.toFixed(0)} Hunger`
         }
      })

      this.bot.on('move', () => {
         if (this.bot.username === activeBot) {
            idNavCoordinates.innerText = `${this.bot.entity.position.x.toFixed(0)}, ${this.bot.entity.position.y.toFixed(0)}, ${this.bot.entity.position.z.toFixed(0)}`
         }
      })

      this.bot.once('spawn', () => {
         const func = require('./events/spawn.js');

         const props = func(this.username);

         this.panel = props['panel'];
         this.chatLog = props['chatLog'];

         echo(1, `Connect`, `${this.host}:${this.port}`, this.username)
      })

      this.bot.on('end', (reason) => {
         const items = document.querySelectorAll('.sidebar-bot-item')
         items.forEach(el => {
            if (el.dataset.bot === this.username) {
               el.remove()
            }
         })
         if (activeBot === this.username) { idNavItems.forEach(el => el.innerText = '') }
         if (reason === 'Выход с клиента') { echo(1, 'Disconnect', reason, this.username); return }

         idMainPanels.forEach(el => { el.classList.remove('active'); })
         idLoginPanel.classList.add('active')
      })

      this.bot.on('death', (reason) => { echo(2, 'death', `Умер`, this.username) })

      this.bot.on('kicked', (reason) => { echo(2, 'Kicked', reason, this.username) })

      this.bot.on('error', (err) => { echo(3, 'Error', err, this.username) })
   }

   // === Функции аддонов
   // Получение статистики бота
   getInfo() {
      if (this.bot.username === activeBot) {
         idNavHealth.innerText = `${this.bot.health.toFixed(0)} Health`
         idNavHunger.innerText = `${this.bot.food.toFixed(0)} Hunger`

         idNavUsername.innerText = `${this.bot.username}`
         idNavServer.innerText = `${this.host}: ${this.port}`

         idNavCoordinates.innerText = `${this.bot.entity.position.x.toFixed(0)}, ${this.bot.entity.position.y.toFixed(0)}, ${this.bot.entity.position.z.toFixed(0)}`
      }
   }
   // Отправка сообщение в чат
   chatSend(text) {
      if (activeBot === '.all.') { this.bot.chat(text) }
      if (this.bot.username === activeBot) { this.bot.chat(text) }
   }
   // Выход с сервера
   quit() {
      // if (activeBot === '.all.') { this.bot.quit('Выход с клиента') }
      // if (this.bot.username === activeBot) { this.bot.quit('Выход с клиента') };


   }
   // Посмотреть на..
   async lookAt(type) {
      if (this.bot.username === activeBot) {
         let target
         switch (type) {
            case 'near-player':
               target = this.bot.nearestEntity(entity => entity.name === 'player')
               if (!target) echo(2, 'lookAt', 'По близости нет игроков.', this.username); else {
                  await this.bot.lookAt(target.position)
                  echo(1, 'lookAt', `посмотрел на ${target.username}`, this.username)
               }
               break;
            case 'player':
               let localPlayers = this.bot.players;
               if (localPlayers[idControlLookAtPlayer.value] != undefined) {
                  const playerLocation = localPlayers[idControlLookAtPlayer.value].entity.position;

                  this.bot.lookAt(playerLocation)
                  echo(1, 'lookAt', `посмотрел на ${idControlLookAtPlayer.value}`, this.username)
               } else {
                  echo(2, 'lookAt', 'По близости нет этого игрока.', this.username)
               }
               break;
         }
      }
   }
   // Клик в слот инвентаря.
   clickWindow(slot) {
      if (activeBot === '.all.') { this.bot.simpleClick.leftMouse(slot); echo(1, 'clickWindow', `Кликнул на ${slot} слот инвентаря.`, `${activeBot}`) }
      if (activeBot === this.username) { this.bot.simpleClick.leftMouse(slot); echo(1, 'clickWindow', `Кликнул на ${slot} слот инвентаря.`, `${this.username}`) }
   }
}
