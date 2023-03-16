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
            <div class="control addon followPlayer">
            <input type="checkbox" class="control followPlayer-input-radio btn-blue"></input>
            <input type="text" class="control followPlayer-input btn-blue" placeholder="Ник игрока">
            <button class="control followPlayer-btn btn-blue" data-use-bot="${username}">Подойти</button>
            </div>
            <div class="control lookAt">
            <select class="control choise-lookAt btn-blue">
               <option value="player" selected class="control choise-lookAt-item">Игрок</option>
               <option value="near-player" class="control choise-lookAt-item">Ближний игрок</option>
            </select>
            <input type="text" class="control lookAt-player btn-blue" placeholder="ник игрока">
            <button class="control-lookAt btn-blue" data-use-bot="${username}">Смотреть</button>
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

   const props = {
      username: `${username}`,
      panel: item,
      chatLog: item.querySelector('.control.ul'),
      tradeLog: item.querySelector('.control.trading-log.ul'),
      tradingBtn: item.querySelector('.control.trading-start'),
      followComeBtn: item.querySelector('.control.followPlayer-btn')
   }

   bot.client(item)

   return props
}


