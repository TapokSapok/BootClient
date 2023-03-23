module.exports = (el, interval) => {
   const index = getActiveBot()

   if (index[0] !== 'console') {

      bots[index[0]].activeAutoclicker = !bots[index[0]].activeAutoclicker;
      console.log('activeAutoclicker ', bots[index[0]].activeAutoclicker)

      if (bots[index[0]].activeAutoclicker) {
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

      bots[index[0]].autoclicker(+interval)

   } else if (index[0] === 'console') {
      for (let i = 0; i < bots.length; i++) {
         bots[i].activeAutoclicker = !bots[i].activeAutoclicker;
         console.log('activeAutoclicker ', bots[i].activeAutoclicker)
         bots[i].autoclicker(+interval)

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
      }
   }
}