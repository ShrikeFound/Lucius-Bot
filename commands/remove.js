const { findSuit } = require('../dealer.js');
module.exports = {
  name: 'remove',
  description: 'removes a card with the given value from your twist deck. Use `!remove [value] [suit]`',
  async execute(bot, message, args) {
    
    if (!message.channel.guild) {
      message.reply("Please try this command in a text channel.")
      return
    }
    
    
    let removedCard;
    let value = args.join(" ").match(/\d+/)
    if (value) {
      value = Number(value[0])
    }
    let suit = args.join(" ").match(/\D+/)
    if (suit) {
      suit = findSuit(suit[0])
    }
    const admin = require('firebase-admin');
    const guildID = message.channel.guild.id
    const userID = message.author.id
    const deckString = `channels/${guildID}/users/${userID}/twist_deck`
    let db = admin.database();
    deckRef = db.ref(deckString)
    deckRef.orderByChild("value").equalTo(value).once("value", (snapshot) => {
      console.log("snapshot: ", snapshot)
      console.log("snapshot val: ", snapshot.val())
      console.log("snapshot key: ", snapshot.key)
    });

  }
}