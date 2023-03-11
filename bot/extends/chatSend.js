module.exports = (el) => {
   if (!el.value || el.value === '/' || el.value === null) return

   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {
         bots[i].chatSend(el.value);
         el.value = '';
      } else if (el.dataset.useBot === '.all.') {
         bots[i].chatSend(el.value);
         el.value = '';
      }
   }
}