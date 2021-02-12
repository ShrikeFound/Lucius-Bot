const {shuffle} = require('../dealer.js')
module.exports = {
  name: 'shuffle',
  description: 'this is the description for the shuffle command',
  async execute(bot,message, args) {
    console.log("shuffling!");
    const admin = require('firebase-admin');
    const guildID = message.channel.guild.id
    const deckString = `channels/${guildID}/fate_deck`
    let db = admin.database();
    let deckRef = db.ref(deckString);
    deckRef.once("value", (snapshot) => {
      fateDeck = snapshot.val();
      // console.log(fateDeck);
      shuffle(fateDeck);
      deckRef.set(fateDeck);
      // console.log(fateDeck);
    }).then(() => {
      message.reply("Fate deck shuffled.");
    })
  }
}