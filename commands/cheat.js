const { findSuit,cheat } = require('../dealer.js');
const flip = require('./flip.js');
module.exports = {
  name: 'cheat',
  description: 'this is the description for the cheat command',
  async execute(bot, message, args) {
    
    if (!message.channel.guild) {
      message.reply("Please try this command in a text channel.")
      return
    }
    
    
    let cheatedCard;
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
    deckRef.once("value", (snapshot) => {
      twistDeck = snapshot.val();
      cheatedCard = cheat(twistDeck, value)
      console.log(cheatedCard);
      deckRef.update(twistDeck);
    }).then(() => {
      if (cheatedCard) {
        message.reply(`${message.author.username} cheated with a ${JSON.stringify(cheatedCard)}`)        
      } else {
        message.reply("sorry, couldn't find that card to cheat with.")
      }

    })

  }
}