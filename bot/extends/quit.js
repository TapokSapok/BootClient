module.exports = () => {
   bots.forEach(el => el.quit())

   if (activeBot != '.all.') {
      idMainPanels.forEach(el => { el.classList.remove('active'); })
      idLoginPanel.classList.add('active')
   }
}