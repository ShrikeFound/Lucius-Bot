const {undraw} = require('../dealer.js');
module.exports = {
  name: 'undraw',
  description: 'Places a a number of cards back unto the twist deck from your control hand. For when you draw too many cards.',
  async execute(bot, message, args) {

    if (!message.channel.guild) {
      message.reply("Please try this command in a text channel.")
      return
    }

    let numDraws = args.join(" ").match(/\d+/)
    let Deck = {}
    if (!numDraws || !(args.join(" ").match(/\d+/)[0] > 0)) {
      numDraws = 1;
    } else {
      numDraws = numDraws[0]
    }
    console.log(numDraws);
    const admin = require('firebase-admin');
    
    const guildID = message.channel.guild.id
    const userID = message.author.id
    const deckString = `channels/${guildID}/users/${userID}/twist_deck`
    let db = admin.database();
    deckRef = db.ref(deckString)
    deckRef.once("value", (snapshot) => {
      Deck = snapshot.val();
      undraw(Deck, numDraws);
      deckRef.set(Deck);
    }).then(() => {
      handContent = Deck.hand.map((card) => {
        if (card.value == 0 || card.value == 14) {
          return `**${card.suit}** (${card.value})`
        } else {
          return `${card.value} of ${card.suit}`
        }
      })
      // console.log(Deck);
      message.author.send(`Cards in your hand (${Deck.hand.length}): ${handContent}. Number of cards in deck/discard: ${Deck.cards.length}/${Deck.discard.length}`);
    })
  }
}