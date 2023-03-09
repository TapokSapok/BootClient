module.exports = () => {
   const player = document.querySelector('.control.lookAt-player')

   idControlChoiseLookAtItem.forEach(el => {
      if (el.selected) {
         switch (el.value) {
            case 'player': for (let i = 0; i < bots.length; i++) { bots[i].lookAt(el.value) }
               break;
            case 'near-player': for (let i = 0; i < bots.length; i++) { bots[i].lookAt(el.value) }
               break;
         }
      }
   })
}