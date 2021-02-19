const {createDeck} = require('../../dealer.js')
const {suits, values } = require('../../config.json');


module.exports = (Discord, bot,guild) => {
  

    //firebase references
    const admin = require('firebase-admin');
    const guildID = guild.id
    const channelString = `channels/${guildID}`
    const fateDeck = createDeck(suits,values)
    let db = admin.database();
    let channelRef = db.ref(channelString);
    channelRef.once('value', (data) => {
      if (!data.val()) {
        console.log("channel doesn't exist. Initializing...");
        channelRef.set({
          "id": guildID,
          "prefix": "!",
          "fate_deck": fateDeck
        })


      } else if (!data.val().fate_deck) {
        console.log("initializing fate deck");
        channelRef.update({
          "fate_deck": fateDeck
        });
      }else {
        console.log("Channel already exists in database.");
      
      }
    })


}