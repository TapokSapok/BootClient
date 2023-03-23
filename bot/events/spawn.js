module.exports = (username, server) => {
   let botImgId = getRandomInt(1, 52);

   const sidebar = document.querySelector('.sidebar')
   const sidebarItem = document.createElement('div');
   sidebarItem.className = 'sidebar-bot-item';
   sidebarItem.dataset.bot = username;
   sidebarItem.dataset.server = server;
   sidebarItem.dataset.id = botImgId;
   sidebarItem.innerHTML = `<img src="images/mc-heads/${botImgId}.png" class="bot-img" draggable="false">`
   sidebar.prepend(sidebarItem)
   idSidebarItem.push(sidebarItem)

   const item = document.createElement('div')
   item.innerHTML = `
         <div class="control header">
            <select class="control choise btn-blue">
               <option class="control choise-item" value="chat" selected>Чат</option>
               <option class="control choise-item" value="addons">Аддоны</option>
               <option class="control choise-item" value="trading">Трейдинг</option>
            </select>
            <button class="control-quit btn-blue" data-use-bot="${username}">Выйти</button>
         </div>


         <div class="control item active" data-item="chat">
            <div class="control chatLog">
               <ul class="control ul"></ul>
            </div>
            <input class="control-chat" data-use-bot="${username}" type="text" placeholder="сообщение в чат">
         </div>


         <div class="control item" data-item="addons">

            <div class="control addon clickWindow">
               <input type="text" class="control clickWindow-input btn-blue" placeholder="Слот инвентаря">
               <button class="control clickWindow-btn btn-blue hint addon" data-hint="Клик по слоту инвентаря" data-use-bot="${username}">Клик</button>
            </div>

            <div class="control addon followPlayer">
               <input type="text" class="control followPlayer-input btn-blue" placeholder="Ник игрока">
               <input type="checkbox" class="control followPlayer-input-radio btn-blue"></input>
               <button class="control followPlayer-btn btn-blue hint addon" data-hint="Подойти [следовать] к игроку" data-use-bot="${username}">Подойти</button>
            </div>

            <div class="control addon lookAt">
               <select class="control choise-lookAt btn-blue">
                  <option value="player" selected class="control choise-lookAt-item">Игрок</option>
                  <option value="near-player" class="control choise-lookAt-item">Ближний игрок</option>
               </select>
               <input type="text" class="control lookAt-player btn-blue" placeholder="Ник игрока">
               <button class="control-lookAt btn-blue hint addon" data-hint="Посмотреть на игрока" data-use-bot="${username}">Смотреть</button>
            </div>
            <div class="control addon autoclicker">
               <input type="number" class="control autoclicker-interval btn-blue" placeholder="Интервал [ms]">
               <button class="control autoclicker-btn btn-blue hint addon" data-hint="Автокликер" data-use-bot="${username}">Старт</button>
            </div>
         
         </div>


      <div class="control item" data-item="trading">

      <div class="control trading-start btn-blue" data-use-bot="${username}">Старт</div>

         <div class="control trading list-adder">

            <select class="control trading select-enchant btn-blue" data-use-bot="${username}">
               <option selected>Добавить зачарование</option>
            </select>
            <select class="control trading select-level btn-blue" data-use-bot="${username}">
               <option selected value="level">Уровень</option>
            </select>
            <input type="number" placeholder="Цена" class="control trading select-max-price btn-blue" data-use-bot="${username}">
            <button type="submit" class="control trading plus btn-blue hint addon" data-hint="Добавить Книгу" data-use-bot="${username}">+</button>

         </div>

         <div class="control trading list" data-use-bot="${username}"></div>
         <div class="control trading trading-log">
         <div class="control trading-log ul"></div>
         
         </div>

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
      botImgId: botImgId,

      tradingBtn: item.querySelector('.control.trading-start'),
      followComeBtn: item.querySelector('.control.followPlayer-btn')
   }

   bot.client(item, username)

   return props
}


