module.exports = (username) => {
   const separator = document.querySelector('.last-separator')
   const sidebarItem = `<div class="sidebar-bot-item" data-bot="${username}"><img src="images/headPlayer.png" class="bot-img" draggable="false"></div>`
   separator.insertAdjacentHTML('beforebegin', sidebarItem)

   const item = document.createElement('div')
   item.innerHTML = `
         <div class="control header">
            <select class="control choise">
               <option class="control choise-item" value="chat" selected>Чат</option>
               <option class="control choise-item" value="addons">Аддоны</option>
               <option class="control choise-item" value="trading">Трейдинг</option>
            </select>
            <button class="control-quit" data-use-bot="${username}">Выйти</button>
         </div>

         <div class="control item active" data-item="chat">
            <div class="control lookAt">
               <select class="control choise-lookAt btn-blue">
                  <option value="player" selected class="control choise-lookAt-item">Игрок</option>
                  <option value="near-player" class="control choise-lookAt-item">Ближний игрок</option>
               </select>
               <input type="text" class="control lookAt-player btn-blue" placeholder="ник игрока">
               <button class="control-lookAt btn-blue" data-use-bot="${username}">Смотреть</button>
            </div>
            <div class="control chatLog">
               <ul class="control ul"></ul>
            </div>
            <input class="control-chat" data-use-bot="${username}" type="text" placeholder="сообщение в чат">
         </div>
         <div class="control item" data-item="addons">
            <div class="control clickWindow">
               <input type="text" class="control clickWindow-input btn-blue" placeholder="Слот инвентаря">
               <button class="control clickWindow-btn btn-blue" data-use-bot="${username}">Клик</button>
            </div>
         </div>

      <div class="control item" data-item="trading">
         <div class="control trading list-adder">

         <select class="control trading select-enchant btn-blue" data-use-bot="${username}">
            <option selected>Добавить зачарование</option>
         </select>
         <select class="control trading select-level btn-blue" data-use-bot="${username}">
            <option selected value="level">Уровень</option>
         </select>
         <input type="number" placeholder="Цена" class="control trading select-max-price btn-blue" data-use-bot="${username}">
         <button type="submit" class="control trading plus btn-blue" data-use-bot="${username}">+</button>

         </div>

      <div class="control trading list" data-use-bot="${username}"></div>
      <div class="control trading trading-log">
         <div class="control trading-log ul"></div>
      </div>

      <div class="control trading-start btn-blue" data-use-bot="${username}">Старт</div>
      </div>
   </div>
            `
   item.className = 'control bar main-panel';
   item.dataset.useBot = `${username}`

   document.querySelector('.bots').append(item)

   // ()()()()()
   const selectControl = item.querySelector('.control.choise');
   const controlItems = item.querySelectorAll('.control.item')

   const selectlookAt = item.querySelector('.control.choise-lookAt')
   const selectlookAtItems = item.querySelectorAll('.control.choise-lookAt-item')
   const lookAtPlayer = item.querySelector('.control.lookAt-player')

   const clickWindowInput = item.querySelector('.control.clickWindow-input')

   const tradingStart = item.querySelector('.control.trading-start')
   const tradingList = item.querySelector('.control.trading.list')
   let tradingListItems = [];
   const tradingSelectEnchant = item.querySelector('.control.trading.select-enchant')
   let tradingSelectEnchantItems = [];
   const tradingSelectLevel = item.querySelector('.control.trading.select-level')
   let tradingSelectLevelItems = [];
   const tradingSelectMaxPrice = item.querySelector('.control.trading.select-max-price')
   const tradingPlusEnchant = item.querySelector('.control.trading.plus')
   let trading = false;

   const quit = item.querySelector('.control-quit')
   const chat = item.querySelector('.control-chat')
   const lookAt = item.querySelector('.control-lookAt')
   const clickWindow = item.querySelector('.control.clickWindow-btn')


   quit.addEventListener('click', (el) => { bot.quit(el.target) })
   chat.addEventListener('keyup', (el) => { if (el.which == 13) { bot.chatSend(el.target) } })
   lookAt.addEventListener('click', (el) => {
      let type = '';
      selectlookAtItems.forEach(el => { if (el.selected) { type = el.value } })
      bot.lookAt(el.target, type, lookAtPlayer.value)
   })
   clickWindow.addEventListener('click', (el) => { bot.clickWindow(el.target, clickWindowInput.value) })
   tradingStart.addEventListener('click', (el) => { bot.StartTrading(el.target); })

   // ()()()()()


   selectControl.addEventListener('change', (e) => {
      controlItems.forEach(el => {
         if (el.dataset.item === e.target.value) {
            controlItems.forEach(el => { el.classList.remove('active') })
            el.classList.add('active')

            if (e.target.value === 'trading') {

               for (let i = 0; i < bot.enchants.enchants.length; i++) {
                  const item = document.createElement('option');
                  item.className = 'control trading select-enchant-item';
                  item.dataset.useBot = `${username}`
                  item.value = `${bot.enchants.enchants[i].id}`
                  item.textContent = `${bot.enchants.enchants[i].displayName}`
                  tradingSelectEnchant.append(item)
                  tradingSelectEnchantItems.push(item)
               }

            }
         }
      })
   })
   selectlookAt.addEventListener('change', () => {

      selectlookAtItems.forEach(el => {
         if (el.selected) {
            if (el.value === 'player') {
               lookAtPlayer.style.display = 'inline-block'
            } else {
               lookAtPlayer.style.display = 'none'
            }
         }
      })
   })


   // ()()()()()


   tradingPlusEnchant.addEventListener('click', (el) => { traidingPlusEnchant(el.target) })
   tradingSelectEnchant.addEventListener('change', (e) => { getTradingLevel(e) })


   const getTradingLevel = (e) => {
      tradingSelectLevelItems.forEach(el => el.remove(), tradingSelectLevelItems = [])

      for (let i = 0; i < bot.enchants.enchants.length; i++) {
         if (e.target.value === bot.enchants.enchants[i].id) {

            for (let j = 1; j < bot.enchants.enchants[i].maxLevel + 1; j++) {
               const item = document.createElement('option');
               item.dataset.useBot = `${username}`
               item.value = `${j}`
               item.textContent = `${j}`

               tradingSelectLevel.append(item)
               tradingSelectLevelItems.push(item)
            }

            tradingSelectLevelItems.forEach(el => {
               if (+el.value === bot.enchants.enchants[i].maxLevel) {
                  el.selected = true;
               }
            })

         }
      }
   }
   const traidingPlusEnchant = (el) => {
      const item = document.createElement('div');
      let enchant = '';

      item.className = 'control trading list-item btn-blue';
      item.dataset.useBot = `${username}`
      tradingSelectEnchantItems.forEach(el => {
         if (el.selected) {
            enchant = el.value
            for (let i = 0; i < bot.enchants.enchants.length; i++) {
               if (el.value === bot.enchants.enchants[i].id) {
                  item.dataset.enchant = bot.enchants.enchants[i].displayName
               }
            }
         }
      })
      tradingSelectLevelItems.forEach(el => el.selected ? item.dataset.level = el.value : undefined)
      item.dataset.maxPrice = tradingSelectMaxPrice.value
      if (!item.dataset.maxPrice) {
         item.textContent = `${item.dataset.enchant} ${item.dataset.level}`
      } else {
         item.textContent = `${item.dataset.enchant} ${item.dataset.level} | Макс.цена: ${item.dataset.maxPrice}`
      }

      if (!item.dataset.enchant) return

      tradingList.append(item)
      tradingListItems.push(item)

      tradingSelectEnchantItems.forEach(el => el.selected = false)
      tradingSelectEnchant.childNodes.selected = true;

      tradingSelectLevelItems.forEach(el => el.selected = false)
      tradingSelectLevel.childNodes.selected = true;

      tradingSelectMaxPrice.value = '';

      item.addEventListener('click', (el) => {
         bot.removeEnchant(el.target, enchant, item.dataset.level, item.dataset.maxPrice, item.dataset.enchant);
         el.target.remove()
      })
      bot.addEnchant(el, enchant, item.dataset.level, item.dataset.maxPrice, item.dataset.enchant);
   }



   // ()()()()()
   return props = {
      username: `${username}`,
      panel: item,
      chatLog: item.querySelector('.control.ul'),
      tradeLog: item.querySelector('.control.trading-log.ul'),
      tradingBtn: item.querySelector('.control.trading-start')
   }
}


