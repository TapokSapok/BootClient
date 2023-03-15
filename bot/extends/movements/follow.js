module.exports = (el, player) => {
   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {

         bots[i].activeFollowPlayer = !bots[i].activeFollowPlayer;
         console.log('activeFollowPlayer ', bots[i].activeFollowPlayer)

         if (bots[i].activeFollowPlayer) {
            el.style.background = 'red';
            el.textContent = 'Стоп';
            el.style.color = 'black';
            el.style.fontWeight = '600';
         } else {
            el.style.background = '';
            el.style.color = '';
            el.style.fontWeight = '';
            el.textContent = 'Следить';
         }

         bots[i].followPlayer(player)
         return bots[i].activeFollowPlayer
      }
   }
}