module.exports = (el) => {
   for (let i = 0; i < bots.length; i++) {
      if (el.dataset.useBot === bots[i].username) {

         bots[i].activeTrading = !bots[i].activeTrading;
         console.log(bots[i].activeTrading);
         bots[i].trading();
         return bots[i].activeTrading;
      }
   }


}


