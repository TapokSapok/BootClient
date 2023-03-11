
module.exports = class Bot {
   constructor(options) {
      this.username = options['username'];
      this.host = options['host'];
      this.port = options['port'];

      this.panel = null;
      this.chatLog = null;

      // this.activeScript = false;
      this.activeTrading = false;

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

         echo(1, `Connect`, ``, this.username)
      })

      this.bot.on('end', (reason) => {
         const items = document.querySelectorAll('.sidebar-bot-item')
         items.forEach(el => {
            if (el.dataset.bot === this.username) {
               el.remove()
            }
         })

         for (let i = 0; i < bots.length; i++) {
            if (!bots[i].panel) continue;
            if (this.username === bots[i].panel.dataset.useBot) {
               bots[i].panel.remove()
            }
         }
         idLoginPanel.classList.add('active')

         if (activeBot === this.username) { idNavItems.forEach(el => el.innerText = '') }
         if (reason === 'Выход с клиента') { echo(1, 'Disconnect', reason, this.username); return }
      })

      this.bot.on('death', (reason) => { echo(2, 'death', '', this.username) })

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
      this.bot.chat(text)
   }
   // Выход с сервера
   quit() {
      this.bot.quit('Выход с клиента')
   }
   // Посмотреть на..
   async lookAt(type, player) {
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
            if (localPlayers[player] != undefined) {
               const playerLocation = localPlayers[player].entity.position;

               this.bot.lookAt(playerLocation)
               echo(1, 'lookAt', `посмотрел на ${player}`, this.username)
            } else {
               echo(2, 'lookAt', 'По близости нет этого игрока.', this.username)
            }
            break;
      }

   }
   // Клик в слот инвентаря.
   clickWindow(slot) {
      this.bot.simpleClick.leftMouse(slot);
      echo(1, 'clickWindow', `Кликнул на ${slot} слот инвентаря.`, `${this.username}`)
   }
   // TRADING ===============


   async trading_checkVillager() {
      const ench = [
         { enchant: 'minecraft:protection', level: 4 },
         { enchant: 'minecraft:sharpness', level: 5 },
         { enchant: 'minecraft:looting', level: 3 },
         { enchant: 'minecraft:efficiency', level: 5 },
         { enchant: 'minecraft:fortune', level: 3 },
      ]

      const target = this.bot.nearestEntity((e) => (e.name === 'villager'))
      await this.bot.lookAt(target.position)
      const villager = await this.bot.openVillager(target)

      for (let i = 0; i < villager.trades.length; i++) {
         if (villager.trades[i].outputItem.nbt) {
            const id = villager.trades[i].outputItem.nbt.value.StoredEnchantments.value.value[0].id.value
            const lvl = villager.trades[i].outputItem.nbt.value.StoredEnchantments.value.value[0].lvl.value
            const price = villager.trades[i].inputItem1.count
            for (let i = 0; i < ench.length; i++) {
               if (id === ench[i].enchant && lvl === ench[i].level) {
                  console.log('\n======================== FOUND ========================')
                  this.activeTrading = false;
               }
            }
            this.trading_log(id, lvl, price)
         }
      }
   }
   trading_isLectern(block) {
      return block.name === 'lectern'
   }
   async trading_dig() {
      const axe = this.bot.inventory.items().find(item => item.name.includes('diamond_axe'))
      if (axe) this.bot.equip(axe, 'hand')

      let block = this.bot.findBlock({
         matching: this.trading_isLectern,
         maxDistance: 5
      })

      if (block) await this.bot.dig(block)
   }
   async trading_place() {
      const lectern = this.bot.inventory.items().find(item => item.name.includes('lectern'))
      if (lectern) this.bot.equip(lectern, 'hand')

      const target = this.bot.nearestEntity((e) => (e.name === 'villager')).position

      let sourcePosition = target.offset(0, -1, -1)
      let sourceBlock = this.bot.blockAt(sourcePosition)

      if (sourceBlock) await this.bot.placeBlock(sourceBlock, new Vec3(0, 1, 0))
   }
   trading_log(enchant, level, price) {
      const str = enchant.substring(10, enchant.length);
      console.log(`\nEnchant: ${str}  ||  Level: ${level} ||  Price: ${price} ||  Time: ${getTime()} `)
   }
   trading_stopTrade() {
      this.bot.clearControlStates()
      this.bot.currentWindow.close()
   }
   async trading() {
      while (this.activeTrading) {
         await this.trading_checkVillager()
         await this.bot.waitForTicks(3)
         if (!this.activeTrading) { this.trading_stopTrade(); return; }
         await this.trading_dig()
         await this.bot.waitForTicks(3)
         await this.trading_place()
         await this.bot.waitForTicks(50)
      }
   }

   // TRADING ===============
}
