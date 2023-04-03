const mineflayer = require('mineflayer');
const bot = require('../internal/manager.js');
const PNGImage = require('pngjs-image');
const Vec3 = require('vec3').Vec3;
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const autoclicker = require('mineflayer-autoclicker');
const autoeat = require('mineflayer-auto-eat');
const path = require('path');
const GoalFollow = goals.GoalFollow;

const chokidar = require('chokidar')

const fs = require('fs')
const DIRNAME = require('../getDirname.js')
const PATH_ACCOUNTS = `${process.env.APPDATA}/SapokClient/assets/accounts/accounts.json`;
const PATH_CAPTCHA = `${process.env.APPDATA}/SapokClient/assets/captcha`
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
   idNavBotImg = document.querySelector('.bot-img'),
   idNavXp = document.querySelector('.nav-xp'),
   idNavProgress = document.querySelector('.progressbar'),
   idNavXpStripe = document.querySelector('.exp-stripe'),

   // Элементы Сайдбара
   idSideNewBot = document.querySelector('.bot-plus'),
   idSideBots = document.querySelectorAll('.sidebar-bot-item'),
   idSidebar = document.querySelector('.sidebar'),
   idSideConsole = document.querySelector('.sideLog.bar'),
   idSidebarItem = [],

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

   idConsoleFollowCome = document.querySelector('.console.followPlayer-btn'),
   idConsoleFollowComeCheckbox = document.querySelector('.console.followPlayer-input-radio'),
   idConsoleFollowComePlayer = document.querySelector('.console.followPlayer-input'),
   idConsoleAutoclicker = document.querySelector('.console.autoclicker-btn'),
   idConsoleAutoclickerInterval = document.querySelector('.console.autoclicker-interval'),
   idConsoleLookAt = document.querySelector('.console-lookAt'),
   idConsoleSelectlookAtItems = document.querySelectorAll('.console.choise-lookAt-item'),
   idConsoleLookAtPlayer = document.querySelector('.console.lookAt-player'),

   idLoginFavoritePanel = document.querySelector('.login.favorite.panel'),
   idLoginFavoriteAdd = document.querySelector('.login.favorite.add'),
   idLoginFavoriteCheckbox = document.querySelector('.login.favorite.checkbox'),
   idLoginFavoriteItems = [],

   idPopupCaptcha = document.querySelector('.popup.captcha')

let bots = [];
let maps = [];
let activeBot = ['.login.', '.login.'];
let x, y;
let markerBotDataUsername = '';
let markerBotDataServer = '';
let markerBot;
let notifyMessages = [];

// Обработчики
document.addEventListener('DOMContentLoaded', () => {

   document.onmouseover = document.onmouseout = mouseAction;
   document.onmousemove = (e) => { x = e.clientX; y = e.clientY; }
   uploadFavorites()
   markerBots(idSideNewBot);
   afterload();

   username.addEventListener('keyup', (el) => { if (el.which == 13) { bot.connect(username.value, host.value, version.value) } })
   host.addEventListener('keyup', (el) => { if (el.which == 13) { bot.connect(username.value, host.value, version.value) } })
   version.addEventListener('keyup', (el) => { if (el.which == 13) { bot.connect(username.value, host.value, version.value) } })

   idLoginBtn.addEventListener('click', () => { bot.connect(username.value, host.value, version.value) })
   idSideNewBot.addEventListener('click', () => { openLoginPanel(); })
   idSideConsole.addEventListener('click', () => { openConsole() })
   document.addEventListener('click', (el) => { choiceBot(el); markerBots(el.target); })

   idLoginFavoriteAdd.addEventListener('click', () => { addFavorite(); })

   idConsoleChat.addEventListener('keyup', (el) => { if (el.which == 13) { bot.chatSend(el.target) } })
   idConsoleQuit.addEventListener('click', (el) => { bot.quit(el.target) })
   idConsoleClickWindowBtn.addEventListener('click', (el) => { bot.clickWindow(el.target, idConsoleClickWindowInput.value) })

   idConsoleFollowCome.addEventListener('click', (el) => {
      if (idConsoleFollowComeCheckbox.checked) {

         if (bot.followPlayer(el.target, idConsoleFollowComePlayer.value)) {
            idConsoleFollowComeCheckbox.disabled = true;
         } else {
            idConsoleFollowComeCheckbox.disabled = false;
         }

      } else {
         bot.comePlayer(el.target, idConsoleFollowComePlayer.value)
      }

   })
   idConsoleAutoclicker.addEventListener('click', (el) => { bot.autoclicker(el.target, idConsoleAutoclickerInterval.value) })
   idConsoleLookAt.addEventListener('click', (el) => {
      let type = '';
      idConsoleSelectlookAtItems.forEach(el => { if (el.selected) { type = el.value } })
      bot.lookAt(el.target, type, idConsoleLookAtPlayer.value)
   })


   idConsoleChoise.addEventListener('change', (e) => {
      idConsoleItems.forEach(el => {
         if (el.dataset.item === e.target.value) {
            idConsoleItems.forEach(el => el.classList.remove('active'))
            el.classList.add('active')
         }
      })
   })
})


async function startClient(options) {
   bots.push(new bot.Bot(options));
}

function choiceBot(el) {
   if (el.target.dataset.bot && el.target.className === 'sidebar-bot-item') {
      activeBot = [el.target.dataset.bot, el.target.dataset.server]

      for (let i = 0; i < bots.length; i++) {
         if (!bots[i].panel) continue;
         if (bots[i].panel.dataset.useBot === el.target.dataset.bot && bots[i].panel.dataset.server === el.target.dataset.server) {
            clearPanels()
            bots[i].panel.classList.add('active')
         }
      }

      idNavProgress.style.display = 'block'

      for (let i = 0; i < bots.length; i++) {
         bots[i].getInfo()
      }
   }
}

function echo(type, title, info, username) {
   const item = document.createElement('li')
   item.className = 'bot-log'

   switch (type) {
      case 1: window.className = 'echo green'
         notify(1, title, info, username)
         item.innerHTML = `<span>${getTime()} </span><span class="green">${title}</span> ${username} <span></span><span class="green">${info}</span>`;
         break;
      case 2: window.className = 'echo yellow'
         notify(2, title, info, username)
         item.innerHTML = `<span>${getTime()} </span><span class="yellow">${title}</span> ${username} <span></span><span class="yellow">${info}</span>`;
         break;
      case 3: window.className = 'echo red'
         notify(3, title, info, username)
         item.innerHTML = `<span>${getTime()} </span><span class="red">${title}</span> ${username} <span></span><span class="red">${info}</span>`;
         break;
   }

   idConsoleLogUl.append(item)
   idConsoleLogUl.scrollIntoView(false)

}

function getTime() {
   const s = new Date().getSeconds(),
      m = new Date().getMinutes(),
      h = new Date().getHours()
   return `${h}:${m}:${s}`
}

function getServer(server) {

   const index = server.indexOf(':')

   if (index !== -1) {
      const port = server.slice(index + 1, server.length);
      const host = server.slice(0, index);

      return [host, +port]
   } else {
      const host = server;

      return [host, 25565]
   }

}

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min);
}

function getActiveBot() {
   for (let i = 0; i < bots.length; i++) {
      if (activeBot[0] === bots[i].username && activeBot[1] === `${bots[i].host}:${bots[i].port}`) {
         return [i]
      } else if (activeBot[0] === '.all.') {
         return ['console']
      }
   }
}



// ================== HTML
function favoriteEvent(item) {
   fs.readFile(PATH_ACCOUNTS, (err, data) => {
      data = JSON.parse(data)
      item.addEventListener('click', () => {
         if (idLoginFavoriteCheckbox.checked) {

            for (let i = 0; i < data.length; i++) {
               if (item.dataset.username === data[i].username
                  && item.dataset.host === data[i].host
                  && (+item.dataset.port === data[i].port
                     || (data[i].port === 0 && item.dataset.port === '')
                     || (data[i].port === '' && +item.dataset.port === 25565))
                  || (data[i].port === '' && !item.dataset.port)
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


   const server = getServer(host.value)

   const option = {
      username: username.value, host: server[0], port: server[1], version: version.value
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
         item.className = 'login favorite item hint favorite-item';
         item.innerHTML = `<span>${data[i].username}</span>`
         item.dataset.username = `${data[i].username}`
         item.dataset.host = `${data[i].host}`
         item.dataset.port = `${data[i].port}`
         item.dataset.version = `${data[i].version}`
         item.dataset.hint = `${data[i].host}:${data[i].port}`
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
         } else if (event.target.dataset.bot === '.login.') {
            popup.innerHTML = 'Login'
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
   if (el.className === 'sidebar-bot-item'
      || el.className === 'sidebar-bot-item bot-log'
      || el.className === 'sidebar-bot-item bot-plus') {
      if (markerBotDataUsername !== activeBot[0] && markerBot !== undefined) {
         markerBot.style.background = '';
         this.return
      }


      markerBotDataUsername = el.dataset.bot;
      markerBotDataServer = el.dataset.server;
      markerBot = el;
      if (markerBotDataUsername === activeBot[0] && markerBotDataServer === activeBot[1]) {
         el.style.background = '#fff'
      }
   }

   if (markerBotDataUsername !== activeBot[0] && markerBot !== undefined) {
      markerBot.style.background = '';
   }
}

function openConsole(elem) {
   activeBot = ['.all.', '.all.']

   clearPanels();
   idConsolePanel.classList.add('active')

   idNavItems.forEach(el => el.innerText = '');
   idNavProgress.style.display = 'none'
   idNavBotImg.src = `images/computer.png`

   idConsoleChatLogUl.scrollIntoView(false)

   idNavUsername.innerText = 'Консоль управления всеми ботами';
}

function openLoginPanel() {
   activeBot = ['.login.', '.login.']

   clearPanels()
   idLoginPanel.classList.add('active')

   idNavItems.forEach(el => el.innerText = '');
   idNavProgress.style.display = 'none';
   idNavBotImg.src = `images/head1.png`;
}

function afterload() {

}

function notify(type, title, info, username) {
   const notifyPanel = document.querySelector('.notify.panel')
   const message = document.createElement('div');

   if (type === 0) {

   } else if (type === 1) {
      message.innerHTML = `<div class="notify message">
      <span class="notify title green">Success: ${title}</span><span class="notify info"> ${username}</span>
      <div class="notify info">${info}</div></div>`;
   } else if (type === 2) {
      message.innerHTML = `<div class="notify message">
      <span class="notify title yellow">Warning: ${title}</span><span class="notify info"> ${username}</span>
      <div class="notify info">${info}</div></div>`;
   } else if (type === 3) {
      message.innerHTML = `<div class="notify message">
      <span class="notify title red">Error: ${title}</span><span class="notify info"> ${username}</span>
      <div class="notify info">${info}</div></div>`;
   }

   message.className = 'notify message'
   notifyPanel.append(message);
   notifyMessages.push(message)

   setTimeout(() => {
      message.classList.add('hide');
      setTimeout(() => { message.remove() }, 160)
   }, 2700);
};

