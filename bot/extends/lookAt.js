module.exports = (el, lookAtItem) => {

   lookAtItem.forEach(el => {
      if (el.selected) {
         switch (el.value) {
            case 'player':

               for (let i = 0; i < bots.length; i++) {
                  if (el.dataset.useBot === bots[i].username) {
                     bots[i].lookAt(el.value)
                  } else if (el.dataset.useBot === '.all.') {
                     bots[i].lookAt(el.value)
                  }
               }

            case 'near-player': for (let i = 0; i < bots.length; i++) { bots[i].lookAt(el.value) }
               break;
         }
      }
   })

}