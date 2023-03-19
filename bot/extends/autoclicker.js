module.exports = (el, interval) => {
   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {

         bots[i].activeAutoclicker = !bots[i].activeAutoclicker;
         console.log('activeAutoclicker ', bots[i].activeAutoclicker)

         if (bots[i].activeAutoclicker) {
            el.style.background = 'red';
            el.textContent = 'Стоп';
            el.style.color = 'black';
            el.style.fontWeight = '600';
         } else {
            el.style.background = '';
            el.style.color = '';
            el.style.fontWeight = '';
            el.textContent = 'Старт';
         }

         bots[i].autoclicker(+interval)
      }
   }
}