const { createDeck,draw } = require('../dealer.js');
module.exports = {
  name: 'create',
  description: 'creates a twist deck from the four suits given. Use `!create [defining suit] [ascendant suit] [center suit] [descendant suit]`',
  async execute(bot, message, args) {

    if (!message.channel.guild) {
      message.reply("Please try this command in a text channel.")
      return
    }

    const definining_suit = args[0] || "unknown";
    const ascendant_suit = args[1] || "unknown";
    const center_suit = args[2] || "unknown";
    const descendant_suit = args[3] || "unknown";
    let twistDeck = createDeck(definining_suit,ascendant_suit,center_suit,descendant_suit);

    const admin = require('firebase-admin');
    const guildID = message.channel.guild.id
    const userID = message.author.id
    const userString = `channels/${guildID}/users/${userID}`
    let db = admin.database();
    let userRef = db.ref(userString);
    draw(twistDeck, 3)
    userRef.once("value", ((snapshot)=> {
      userRef.update({ "id": userID ,"twist_deck":twistDeck})
      // const controlHand = createDeck()
    })).then(() => {
      message.reply("Twist deck created!")
    })

    
  }
}