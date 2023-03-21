const mineflayer = require('mineflayer');
const bot = require('../internal/manager.js');
const PNGImage = require('pngjs-image');
const Vec3 = require('vec3').Vec3;
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const autoclicker = require('mineflayer-autoclicker')
const path = require('path')
const GoalFollow = goals.GoalFollow;

const fs = require('fs')
const DIRNAME = require('../getDirname.js')
const PATH_ACCOUNTS = './resources/assets/accounts/accounts.json';
const PATH_CAPTCHA = './resources/assets/captcha'
console.log(DIRNAME)

const // Элементы логина
   idLoginBtn = document.querySelector('.login-submit'),
   host = document.querySelector('.login-host'),
   username = document.querySelector('.login-username'),
   port = document.querySelector('.login-port'),
   version = document.querySelector('.login-version'),

   // Элементы Нав.Бара
   idNavHealth = document.querySelector('.nav-health'),
   idNavHunger = document.querySelector('.nav-hunger'),
   idNavUsername = document.querySelector('.nav-username'),
   idNavServer = document.querySelector('.nav-server'),
   idNavCoordinates = document.querySelector('.nav-coordinates'),
   idNavItems = document.querySelectorAll('.nav-info-item'),

   // Элементы Сайдбара
   idSideNewBot = document.querySelector('.bot-plus'),
   idSideBots = document.querySelectorAll('.sidebar-bot-item'),
   idSidebar = document.querySelector('.sidebar'),
   idSideConsole = document.querySelector('.sideLog.bar'),
   idSidebarItem = [];

// Панели
idMainPanels = document.querySelectorAll('.main-panel'),
   idLoginPanel = document.querySelector('.login.bar'),
   idControlPanel = document.querySelector('.control.bar'),
   idConsolePanel = document.querySelector('.console.bar'),

   // Контроль панель
   idControlQuit = document.querySelector('.control-quit'),
   idControlChatBtn = document.querySelector('.control-chat-submit'),
   idControlChat = document.querySelector('.control-chat'),
   idControlLookAt = document.querySelector('.control-lookAt'),
   idControlChatLogUl = document.querySelector('.control.ul'),
   idControlChatLogLiItems = document.querySelectorAll('.control.ul li'),
   idControlChoise = document.querySelector('.control.choise'),
   idControlItems = document.querySelectorAll('.control.item'),
   idControlClickWindowBtn = document.querySelector('.control.clickWindow-btn'),
   idControlClickWindowInput = document.querySelector('.control.clickWindow-input'),

   idControlChoiseLookAt = document.querySelector('.control.choise-lookAt'),
   idControlChoiseLookAtItem = document.querySelectorAll('.control.choise-lookAt-item'),
   idControlLookAtPlayer = document.querySelector('.control.lookAt-player'),

   // Консоль панель
   idConsoleQuit = document.querySelector('.console-quit'),
   idConsoleChatBtn = document.querySelector('.console-chat-submit'),
   idConsoleChat = document.querySelector('.console-chat'),
   idConsoleChatLogUl = document.querySelector('.console.ul'),
   idConsoleChatLogLiItems = document.querySelectorAll('.console.ul li'),
   idConsoleChoise = document.querySelector('.console.choise'),
   idConsoleItems = document.querySelectorAll('.console.item'),
   idConsoleLogUl = document.querySelector('.console.ul.log'),
   idConsoleClickWindowBtn = document.querySelector('.console.clickWindow-btn'),
   idConsoleClickWindowInput = document.querySelector('.console.clickWindow-input'),

   idLoginFavoritePanel = document.querySelector('.login.favorite.panel'),
   idLoginFavoriteAdd = document.querySelector('.login.favorite.add'),
   idLoginFavoriteCheckbox = document.querySelector('.login.favorite.checkbox'),
   idLoginFavoriteItems = [],

   idPopupCaptcha = document.querySelector('.popup.captcha')

let bots = [];
let maps = [];
let activeBot = '';
let x, y;
let markerBotData = '';
let markerBot;

// Обработчики
document.addEventListener('DOMContentLoaded', () => {

   document.onmouseover = document.onmouseout = mouseAction;
   document.onmousemove = (e) => { x = e.clientX; y = e.clientY; }
   uploadFavorites()
   afterload()
   // document.querySelector('.popup.captcha').style.display = 'block';

   username.addEventListener('keyup', (el) => { if (el.which == 13) { bot.connect(username.value, host.value, version.value) } })
   host.addEventListener('keyup', (el) => { if (el.which == 13) { bot.connect(username.value, host.value, version.value) } })
   // port.addEventListener('keyup', (el) => { if (el.which == 13) { bot.connect(username.value, host.value, port.value, version.value) } })
   version.addEventListener('keyup', (el) => { if (el.which == 13) { bot.connect(username.value, host.value, version.value) } })

   idLoginBtn.addEventListener('click', () => { bot.connect(username.value, host.value, version.value) })
   idSideNewBot.addEventListener('click', () => { openLoginPanel(); })
   idSideConsole.addEventListener('click', () => { openConsole() })
   document.addEventListener('click', (el) => { choiceBot(el); markerBots(el); })


   idConsoleChat.addEventListener('keyup', (el) => { if (el.which == 13) { bot.chatSend(el.target) } })
   idConsoleQuit.addEventListener('click', (el) => { bot.quit(el.target) })
   idConsoleClickWindowBtn.addEventListener('click', (el) => { bot.clickWindow(el.target, idConsoleClickWindowInput.value) })

   idConsoleChoise.addEventListener('change', (e) => {
      idConsoleItems.forEach(el => {
         if (el.dataset.item === e.target.value) {
            idConsoleItems.forEach(el => el.classList.remove('active'))
            el.classList.add('active')
         }
      })
   })
})

// Подключение бота
async function startClient(options) {
   bots.push(new bot.Bot(options));
}

// Выбор бота в сайдбаре
function choiceBot(el) {
   if (el.target.dataset.bot && el.target.className === 'sidebar-bot-item') {
      activeBot = el.target.dataset.bot;

      for (let i = 0; i < bots.length; i++) {
         if (!bots[i].panel) continue;
         if (bots[i].panel.dataset.useBot === el.target.dataset.bot) {
            clearPanels()
            bots[i].panel.classList.add('active')
         }
      }

      for (let i = 0; i < bots.length; i++) {
         bots[i].getInfo()
      }
   }
}

// Уведомление
function echo(type, title, info, username) {

   const window = document.createElement('div')
   const item = document.createElement('li')
   item.className = 'bot-log'

   switch (type) {
      case 1: window.className = 'echo green'
         window.innerHTML = `<div class="echo-title">Success: ${title} | ${username}</div><div class="echo-info">${info}</div>`;
         item.innerHTML = `<span>${getTime()} </span><span class="green">${title}</span> ${username} <span></span><span class="green">${info}</span>`;
         break;
      case 2: window.className = 'echo yellow'
         window.innerHTML = `<div class="echo-title">Warning: ${title} | ${username}</div><div class="echo-info">${info}</div>`;
         item.innerHTML = `<span>${getTime()} </span><span class="yellow">${title}</span> ${username} <span></span><span class="yellow">${info}</span>`;
         break;
      case 3: window.className = 'echo red'
         window.innerHTML = `<div class="echo-title">Error: ${title} | ${username}</div><div class="echo-info">${info}</div>`;
         item.innerHTML = `<span>${getTime()} </span><span class="red">${title}</span> ${username} <span></span><span class="red">${info}</span>`;
         break;
   }

   const windows = document.querySelectorAll('.echo')
   for (let i = 0; i < windows.length; i++) { if (window.innerHTML === windows[i].innerHTML) return }

   document.body.append(window)
   idConsoleLogUl.append(item)
   idConsoleLogUl.scrollIntoView(false)

   windows.forEach(el => { el.style.bottom = `${window.style.height + 70}px` })
   setTimeout(() => { window.remove() }, 3000);
}

// Получение времени
function getTime() {
   const s = new Date().getSeconds(),
      m = new Date().getMinutes(),
      h = new Date().getHours()
   return `${h}:${m}:${s}`
}

idLoginFavoriteAdd.addEventListener('click', () => { addFavorite() })





// ================== HTML
function favoriteEvent(item) {
   fs.readFile(PATH_ACCOUNTS, (err, data) => {
      data = JSON.parse(data)
      item.addEventListener('click', () => {
         if (idLoginFavoriteCheckbox.checked) {

            for (let i = 0; i < data.length; i++) {
               if (item.dataset.username === data[i].username
                  && item.dataset.host === data[i].host
                  && (item.dataset.port === data[i].port || (data[i].port === 0 && item.dataset.port === ''))
                  && item.dataset.version === data[i].version) {
                  data.splice(i, 1)
               }
            }
            fs.writeFileSync(PATH_ACCOUNTS, JSON.stringify(data))
            uploadFavorites()

         } else {
            username.value = item.dataset.username;
            if (!item.dataset.port) {
               host.value = `${item.dataset.host}`
            } else {
               host.value = `${item.dataset.host}:${item.dataset.port}`;
            }
            version.value = item.dataset.version
         }
      })
   })
}

function addFavorite() {
   if (!username.value || (!host.value || host.value === ':0')) return;

   const index = host.value.indexOf(':')

   let hostFav = '';
   let portFav = '';

   if (index !== -1) {
      portFav = host.value.slice(index + 1, host.value.length)
      hostFav = host.value.slice(0, index)
   } else {
      hostFav = host.value;
   }

   const option = {
      username: username.value, host: hostFav, port: portFav, version: version.value
   }

   fs.readFile(PATH_ACCOUNTS, (err, data) => {
      if (!data) return;

      data = JSON.parse(data)

      for (let i = 0; i < data.length; i++) {
         if (data[i].username === option.username
            && data[i].host === option.host
            && data[i].port === option.port
            && data[i].version === option.version) return;
      }

      data.push(option);
      fs.writeFileSync(PATH_ACCOUNTS, JSON.stringify(data))
      uploadFavorites()
   })
}

function uploadFavorites() {

   idLoginFavoriteItems.forEach(el => el.remove())

   fs.readFile(PATH_ACCOUNTS, (err, data) => {
      data = JSON.parse(data)

      for (let i = 0; i < data.length; i++) {
         const item = document.createElement('div')
         item.className = 'login favorite item';
         item.innerHTML = `<span>${data[i].username}</span>`
         item.dataset.username = `${data[i].username}`
         item.dataset.host = `${data[i].host}`
         item.dataset.port = `${data[i].port}`
         item.dataset.version = `${data[i].version}`
         idLoginFavoritePanel.append(item)
         idLoginFavoriteItems.push(item)
         favoriteEvent(item)
      }
   })

}


function clearPanels() {
   for (let i = 0; i < bots.length; i++) {
      if (!bots[i].panel) continue;
      bots[i].panel.classList.remove('active');
   }
   idMainPanels.forEach(el => { el.classList.remove('active'); })
}

function choiseLookAt() {
   const player = document.querySelector('.control.lookAt-player')

   idControlChoiseLookAtItem.forEach(el => {
      if (el.selected) {
         if (el.value === 'player') {
            player.style.display = 'inline-block'
         } else {
            player.style.display = 'none'
         }
      }
   })
}

function chatLog(text) {
   const item = document.createElement('li')

   item.innerText = text;
   idControlChatLogUl.append(item)
   idControlChatLogUl.scrollIntoView(false)
}

function consoleChatLog(text) {
   const item = document.createElement('li')

   item.innerText = text;

   idConsoleChatLogUl.append(item)
   idConsoleChatLogUl.scrollIntoView(false)
}

function mouseAction(event) {
   if (event.type == 'mouseover') {
      if (event.target.dataset.bot) {
         const popup = document.createElement('div')

         if (event.target.dataset.bot === '.all.') {
            popup.innerHTML = 'Console'
         } else {
            popup.innerHTML = event.target.dataset.bot;
         }

         popup.style.top = `${y - 5}px`
         popup.style.left = `${x - 5}px`

         popup.className = 'popup bot'

         document.body.prepend(popup)
      }

   }
   if (event.type == 'mouseout') {
      document.querySelectorAll('.popup.bot').forEach(el => el.remove())
   }
}

function markerBots(el) {
   if (el.target.className === 'sidebar-bot-item' || el.target.className === 'sidebar-bot-item bot-log') {
      if (markerBotData !== activeBot && markerBot !== undefined) {
         markerBot.style.background = '';
         this.return
      }

      markerBotData = el.target.dataset.bot;
      markerBot = el.target;
      if (markerBotData === activeBot) {
         el.target.style.background = '#fff'
      }

   }

   if (markerBotData !== activeBot && markerBot !== undefined) {
      markerBot.style.background = '';
   }
}

// Открытие консоли
function openConsole(elem) {
   activeBot = '.all.'

   clearPanels();
   idConsolePanel.classList.add('active')

   idNavItems.forEach(el => el.innerText = '')

   idConsoleChatLogUl.scrollIntoView(false)

   idNavUsername.innerText = 'Консоль управления всеми ботами';
}

// Открытие панели логина
function openLoginPanel() {
   activeBot = ''

   clearPanels()
   idLoginPanel.classList.add('active')

   idNavItems.forEach(el => el.innerText = '')
}

function afterload() {
   // const item = document.createElement('div')
   // item.className = 'popup captcha hide show'
   // item.innerHTML = `<span class="title">Заявок на капчу: <span class="count">3</span></span>
   //    <button type="submit" class="popup captcha-btn">Решить</button>`

   // document.body.prepend(item)
}

// idPopupCaptcha.addEventListener('click', () => {
//    document.querySelector('.popap.captcha.panel.hide').classList.contains('show') ? document.querySelector('.popap.captcha.panel.hide').classList.remove('show')
//       : document.querySelector('.popap.captcha.panel.hide').classList.add('show')
// })