module.exports = () => {
   const item = document.createElement('div')
   item.innerHTML = `<div class="control header">
            <select class="control choise">
               <option value="chat" selected>Чат</option>
               <option value="addons">Аддоны</option>
               <option value="trading">Трейдинг</option>
            </select>
            <button class="control-quit">Выйти</button>
         </div>

         <div class="control item active" data-item="chat">
            <div class="control lookAt">
               <select class="control choise-lookAt btn-blue" onchange="choiseLookAt()">
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
            <input class="control-chat" type="text" placeholder="сообщение в чат">
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
   mainItem.className = 'control bar main-panel';
   mainItem.dataset.useBot = `${this.username}`
   document.querySelector('.bots').append(mainItem)
   panelBots.push(mainItem)

   panelBots.forEach(el => console.log(el))

}