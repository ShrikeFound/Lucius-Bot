const {createDeck} = require('../dealer.js')
const {suits, values } = require('../config.json');

module.exports = {
  name: 'init',
  description: "this initializes channel settings and creates a fate deck if one doesn't exist",
  async execute(bot,message, args) {
    console.log("initializing!");

    //firebase references
    const admin = require('firebase-admin');
    const guildID = message.channel.guild.id
    const channelString = `channels/${guildID}`
    console.log(typeof guildID)
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
}