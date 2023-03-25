const { pathfinder, Movements } = require('mineflayer-pathfinder');
const { fstat } = require('original-fs');
const DIRNAME = require('../getDirname');

module.exports = class Bot {
   constructor(options) {
      // MAIN
      this.username = options['username'];
      this.host = options['host'];
      this.port = options['port'];
      this.version = options['version'];

      // SECOND
      this.mcData = null;
      this.panel = null;
      this.chatLog = null;
      this.tradeLog = null;
      this.botImgId = null;

      // SCRIPTS
      this.activeScript = false;

      this.activeFollowPlayer = false;
      this.activeAutoclicker = false;

      this.followComeBtn = null;

      // TRADING
      this.tradingBtn = null;
      this.activeTrading = false;
      this.tradingEnchants = [];

      this.initBot();
   }

   initBot() {
      this.bot = mineflayer.createBot({
         'username': this.username,
         'host': this.host,
         'port': this.port,
         'version': this.version,
      })
      this.initEvents()

      this.bot.loadPlugin(pathfinder);
      this.bot.loadPlugin(autoclicker);

      console.log('[DEBUG] init bot')
   }

   initEvents() {
      this.bot.on("messagestr", (text) => {
         bot.messageStr(this.username, text)
      })

      this.bot.on('health', () => {
         if (this.bot.username === activeBot[0]) {
            idNavHealth.innerText = `${this.bot.health.toFixed(0)} Health`
            idNavHunger.innerText = `${this.bot.food.toFixed(0)} Hunger`
         }
      })

      this.bot.on('move', () => {
         if (this.bot.username === activeBot[0]) {
            idNavCoordinates.innerText = `${this.bot.entity.position.x.toFixed(0)}, ${this.bot.entity.position.y.toFixed(0)}, ${this.bot.entity.position.z.toFixed(0)}`
         }
      })

      this.bot.once('login', () => {
         console.log('[DEBUG] login bot')
         const props = bot.spawn(this.username, `${this.host}:${this.port}`);

         this.mcData = require('minecraft-data')(this.bot.version)
         this.panel = props['panel'];
         this.chatLog = props['chatLog'];
         this.tradeLog = props['tradeLog'];
         this.botImgId = props['botImgId'];

         this.tradingBtn = props['tradingBtn'];
         this.followComeBtn = props['followComeBtn'];

         echo(1, `Connect`, `${this.host}:${this.port}`, this.username);
      })

      this.bot.once('spawn', () => {
         if (this.bot.username === activeBot[0]) {
            idNavUsername.innerText = `${this.bot.username}`
            idNavServer.innerText = `${this.host}:${this.port}`
         }
         console.log('[DEBUG] bot spawn')

         if (!this.panel) {
            const props = bot.spawn(this.username, `${this.host}:${this.port}`);

            this.mcData = require('minecraft-data')(this.bot.version)
            this.panel = props['panel'];
            this.chatLog = props['chatLog'];
            this.tradeLog = props['tradeLog'];

            this.tradingBtn = props['tradingBtn'];
            this.followComeBtn = props['followComeBtn'];
         }
      })

      this.bot.on('end', (reason) => {
         const server = `${this.host}:${this.port}`
         const items = document.querySelectorAll('.sidebar-bot-item')
         items.forEach(el => {
            if (el.dataset.bot === this.username && el.dataset.server === server) {
               el.remove()
            }
         })

         for (let i = 0; i < bots.length; i++) {
            if (!bots[i].panel) continue;
            if (this.username === bots[i].panel.dataset.useBot && bots[i].panel.dataset.server === server) {
               bots[i].panel.remove();
               bots.splice(i, 1)
            }
         }

         // setTimeout(() => {

         //    const options = {
         //       username: this.username,
         //       host: this.host,
         //       port: this.port,
         //       version: this.version,
         //    }
         //    startClient(options)
         // }, 100)

         if (activeBot[0] === this.username && activeBot[1] === server) {
            idNavItems.forEach(el => el.innerText = '');
            idLoginPanel.classList.add('active');
            activeBot = ['.login.', '.login.']
            markerBots(idSideNewBot);
            idNavBotImg.src = `images/head1.png`;
         }
         if (reason === 'Выход с клиента') { echo(1, 'Disconnect', reason, this.username); return }
      })

      this.bot._client.on('map', ({ data }) => {
         if (!data) return;

         const size = Math.sqrt(data.length);
         const image = PNGImage.createImage(size, size);

         for (let x = 0; x < size; x++) {
            for (let z = 0; z < size; z++) {

               const colorId = data[x + (z * size)];
               image.setAt(x, z, bot.getColor(colorId));
            }
         }

         const chatLog = this.panel.querySelector('.control.chatLog');
         const username = this.username;
         let img = null;

         image.writeImage(`${PATH_CAPTCHA}/map_${this.bot.username}.png`, (err) => {
            if (err) throw err;
            if (!fs.existsSync(`${PATH_CAPTCHA}/map_${this.bot.username}.png`)) return console.log('нету картинки :(')

            const item = document.createElement('img')
            item.className = 'captcha img';
            item.src = `${PATH_CAPTCHA}/map_${this.bot.username}.png`
            item.dataset.useBot = this.username;
            chatLog.prepend(item)
            img = item;
         });

         this.bot.on('login', function () {
            if (img) img.remove()
            fs.unlink(`${PATH_CAPTCHA}/map_${username}.png`, () => { })
         });
         this.bot.on('end', () => {
            if (img) img.remove()
            fs.unlink(`${PATH_CAPTCHA}/map_${username}.png`, () => { })
         })
      });


      this.bot.on('death', (reason) => { echo(2, 'death', '', this.username) })

      this.bot.on('kicked', (reason) => { echo(2, 'Kicked', reason, this.username) })

      this.bot.on('error', (err) => { echo(3, 'Error', err, this.username) })
   }


   getInfo() {
      if (this.bot.username === activeBot[0]) {

         idNavBotImg.src = `images/mc-heads/${this.botImgId}.png`
         if (this.bot.health) idNavHealth.innerText = `${this.bot.health.toFixed(0)} Health`
         else idNavHealth.innerText = `20 Health`
         if (this.bot.food) idNavHunger.innerText = `${this.bot.food.toFixed(0)} Hunger`
         else idNavHunger.innerText = `20 Hunger`
         if (this.bot.username) idNavUsername.innerText = `${this.bot.username}`
         if (this.host && this.port) idNavServer.innerText = `${this.host}:${this.port}`

         idNavCoordinates.innerText = `${this.bot.entity.position.x.toFixed(0)}, ${this.bot.entity.position.y.toFixed(0)}, ${this.bot.entity.position.z.toFixed(0)}`
      }
   }

   chatSend(text) {
      this.bot.chat(text)
   }

   quit() {
      this.bot.quit('Выход с клиента')
   }

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

   clickWindow(slot) {
      this.bot.simpleClick.leftMouse(slot);
      echo(1, 'clickWindow', `Кликнул на ${slot} слот инвентаря.`, `${this.username}`)
   }

   stopComeFollow(type) {
      this.activeFollowPlayer = false;
      if (this.bot.pathfinder !== undefined) this.bot.pathfinder.setGoal(null);
      this.bot.clearControlStates();
      bot.stopFollowPlayer(this.followComeBtn, type);
   }

   autoclicker(interval) {
      if (this.activeAutoclicker) {
         this.bot.autoclicker.options.delay = interval ? interval : 1500;
         this.bot.autoclicker.start();
      } else {
         this.bot.autoclicker.stop();
      }
   }

   async comePlayer(player) {

      const target = this.bot.players[`${player}`];
      if (!target) {
         echo(2, 'comePlayer', `По близости нет игрока [${player}]`, this.username);
         this.stopComeFollow('come')
         return false
      }

      echo(1, 'comePlayer', `Начал путь до игрока [${player}]`, this.username)
      const goal = new GoalFollow(target.entity, 1);
      await this.bot.pathfinder.goto(goal)
      echo(1, 'comePlayer', `Подошел к игроку [${player}]`, this.username)

   }
   async followPlayer(player) {

      if (!this.activeFollowPlayer) { this.stopComeFollow(player); return; }

      const target = this.bot.players[`${player}`];
      if (!target) {
         echo(2, 'followPlayer', `По близости нет игрока [${player}]`, this.username);
         this.stopComeFollow('follow');
         return 0;
      }

      echo(1, 'followPlayer', `Начал следовать за игроком [${player}].`, this.username)

      const movements = new Movements(this.bot, this.mcData);
      this.bot.pathfinder.setMovements(movements)
      const goal = new GoalFollow(target.entity, 1);

      await this.bot.pathfinder.setGoal(goal, true)
   }


   scriptLog(script, state) {
      switch (script) {
         case 'trading':
            const item = document.createElement('li');

            if (state) {
               item.innerHTML = `<span class="green">${getTime()} | ${this.username} Начал трейдинг.</span>`;
            } else {
               item.innerHTML = `<span class="green">${getTime()} | ${this.username} Закончил трейдинг.</span>`;
            }

            this.tradeLog.append(item)
            this.tradeLog.scrollIntoView(false)
            break;
      }
   }

   // ТРЕЙДИНГ
   stopTrading() {
      this.activeTrading = false;
      bot.stopTrading(this.tradingBtn);
      this.bot.clearControlStates();
      this.bot.currentWindow.close();
   }
   async trading() {
      while (this.activeTrading) {
         await this.trading_checkVillager()
         await this.bot.waitForTicks(3)
         if (!this.activeTrading) { this.stopTrading(); return; }
         await this.trading_dig()
         await this.bot.waitForTicks(3)
         await this.trading_place()
         await this.bot.waitForTicks(50)
      }
   }
   addEnchant(obj) {
      this.tradingEnchants.push(obj)
      console.log(this.tradingEnchants)
   }
   removeEnchant(obj) {
      for (let i = 0; i < this.tradingEnchants.length; i++) {
         if (this.tradingEnchants[i].enchant === obj.enchant
            && this.tradingEnchants[i].level === obj.level
            && this.tradingEnchants[i].maxPrice === obj.maxPrice) {
            this.tradingEnchants.splice(i, 1)
         }
      }
   }
   async trading_checkVillager() {

      const target = this.bot.nearestEntity((e) => (e.name === 'villager'));
      await this.bot.lookAt(target.position);
      const villager = await this.bot.openVillager(target);

      for (let i = 0; i < villager.trades.length; i++) {
         if (villager.trades[i].outputItem.nbt) {
            const id = villager.trades[i].outputItem.nbt.value.StoredEnchantments.value.value[0].id.value;
            const lvl = villager.trades[i].outputItem.nbt.value.StoredEnchantments.value.value[0].lvl.value;
            const price = villager.trades[i].inputItem1.count;

            for (let j = 0; j < this.tradingEnchants.length; j++) {

               if (id === this.tradingEnchants[j].enchant
                  && lvl === +this.tradingEnchants[j].level
                  && (!this.tradingEnchants[j].maxPrice || price <= +this.tradingEnchants[j].maxPrice)) {

                  this.trading_log(id, lvl, price, true, this.tradingEnchants[j].displayName)
                  this.activeTrading = false;
                  return;
               }
            }
            this.trading_log(id, lvl, price, false, '')
         }
      }
   }
   trading_isLectern(block) {
      return block.name === 'lectern'
   }
   async trading_dig() {
      const axes = ['diamond_axe', 'netherite_axe', 'golden_axe', 'iron_axe', 'stone_axe', 'wooden_axe'];
      let axe = '';

      this.bot.inventory.items().forEach(item => {
         axes.forEach(topor => {
            if (item.name === topor) {
               axe = item
            }
         })

      })
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
   trading_log(enchant, level, price, type, displayName) {
      const str = enchant.substring(10, enchant.length);

      const item = document.createElement('li');
      if (type) {
         item.innerHTML = `<span class="yellow">${getTime()} | ${displayName} ${level} | ${price} Изумрудов</span>`;
         echo(1, `Trading`, `Выбил: ${displayName} ${level} за ${price} изумрудов`, this.username)
      } else item.innerHTML = `${getTime()} | ${str} ${level} | ${price} Изумрудов`

      this.tradeLog.append(item)
      this.tradeLog.scrollIntoView(false)
   }
   // ТРЕЙДИНГ
}
