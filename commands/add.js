const { findSuit } = require('../dealer.js');
module.exports = {
  name: 'add',
  description: 'adds a card to your twist deck',
  async execute(bot, message, args) {

    if (!message.channel.guild) {
      message.reply("Please try this command in a text channel.")
      return
    }

    let value = args.join(" ").match(/\d+/)
    if (value) {
      value = Number(value[0])
    }

    let suit = args.join(" ").match(/\D+/)
    if (suit) {
      suit = findSuit(suit[0])
    }

    const addedCard = { value, suit}

    const admin = require('firebase-admin');
    const guildID = message.channel.guild.id
    const userID = message.author.id
    const deckString = `channels/${guildID}/users/${userID}/twist_deck`
    let db = admin.database();
    let deckRef = db.ref(deckString);
    
    deckRef.once("value", ((snapshot) => {
      const twistDeck = snapshot.val();
      twistDeck.cards = twistDeck.cards || []
      twistDeck.cards.push(addedCard)
      console.log(twistDeck)
      deckRef.set({"cards" : twistDeck.cards})
    })).then(() => {
        message.author.send("Twist deck updated.")
    })

    
  }
}