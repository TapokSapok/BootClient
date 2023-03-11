module.exports = (username) => {
   const separator = document.querySelector('.last-separator')
   const sidebarItem = `<div class="sidebar-bot-item" data-bot="${username}"><img src="images/headPlayer.png" class="bot-img" draggable="false"></div>`
   separator.insertAdjacentHTML('beforebegin', sidebarItem)

   const item = document.createElement('div')
   item.innerHTML = `<div class="control header">
            <select class="control choise">
               <option value="chat" selected>Чат</option>
               <option value="addons">Аддоны</option>
               <option value="trading">Трейдинг</option>
            </select>
            <button class="control-quit" data-use-bot="${username}">Выйти</button>
         </div>

         <div class="control item active" data-item="chat">
            <div class="control lookAt">
               <select class="control choise-lookAt btn-blue" onchange="choiseLookAt(this)">
                  <option value="player" selected class="control choise-lookAt-item">Игрок</option>
                  <option value="near-player" class="control choise-lookAt-item">Ближний игрок</option>
               </select>
               <input type="text" class="control lookAt-player btn-blue" placeholder="ник игрока">
               <button class="control-lookAt btn-blue">Смотреть</button>
            </div>
            <div class="control chatLog">
               <ul class="control ul">

               </ul>
            </div>
            <input class="control-chat" data-use-bot="${username}" type="text" placeholder="сообщение в чат">
         </div>
         <div class="control item" data-item="addons">
            <div class="control clickWindow">
               <input type="text" class="control clickWindow-input btn-blue" placeholder="Слот инвентаря">
               <button class="control clickWindow-btn btn-blue">Клик</button>
            </div>
         </div>
         <div class="control item" data-item="trading">
            <div class="control trading-start btn-blue">Старт</div>
            <div class="control trading-items"></div>
            <select class="btn-blue">
            <option selected>Добавить зачарование</option>
            </select>
            </div>`
   item.className = 'control bar main-panel';
   item.dataset.useBot = `${username}`

   document.querySelector('.bots').append(item)

   const quit = item.querySelector('.control-quit')
   const chat = item.querySelector('.control-chat')
   const lookAt = item.querySelector('.control-lookAt')

   quit.addEventListener('click', (el) => { bot.quit(el.target) })
   chat.addEventListener('keyup', (el) => { if (el.which == 13) { bot.chatSend(el.target) } })
   lookAt.addEventListener('click', (el) => { bot.lookAt(el.target, item.querySelectorAll('.control.lookAt-player')) })

   return props = {
      username: `${username}`,
      panel: item,
      chatLog: item.querySelector('.control.ul')
   }
}