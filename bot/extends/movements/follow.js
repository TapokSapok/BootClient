module.exports = (el, player) => {
   const index = getActiveBot()

   if (index[0] !== 'console') {

      bots[index[0]].activeFollowPlayer = !bots[index[0]].activeFollowPlayer;
      console.log('activeFollowPlayer ', bots[index[0]].activeFollowPlayer)

      if (bots[index[0]].activeFollowPlayer) {
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

      bots[index[0]].followPlayer(player)
      return bots[index[0]].activeFollowPlayer

   } else if (index[0] === 'console') {
      for (let i = 0; i < bots.length; i++) {

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