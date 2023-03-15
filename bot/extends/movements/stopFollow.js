module.exports = (el, type) => {
   el.style.background = '';
   el.style.color = '';
   el.style.fontWeight = '';

   if (type === 'come') {
      el.textContent = 'Подойти';
   } else if (type === 'follow') {
      el.textContent = 'Следить';
   }

}