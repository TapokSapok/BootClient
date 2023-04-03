module.exports = (el) => {
   const index = getActiveBot()

   if (index[0] !== 'console') {

      bots[index[0]].activeAutoEat = !bots[index[0]].activeAutoEat;

      console.log('activeAutoEat ', bots[index[0]].activeAutoEat)

      if (bots[index[0]].activeAutoEat) {
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

      if (bots[index[0]].activeAutoEat) bots[index[0]].eat();
      return bots[index[0]].activeAutoEat

   } else if (index[0] === 'console') {

   }
}