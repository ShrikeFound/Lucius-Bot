const {draw} = require('../dealer.js');
const flip = require('./flip.js');
module.exports = {
  name: 'draw',
  description: 'this is the description for the draw command',
  async execute(bot, message, args) {
    let numDraws = args.join(" ").match(/\d+/)
    let fateDeck = {}
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
      fateDeck = snapshot.val();
      draw(fateDeck, numDraws);
      deckRef.set(fateDeck);
    }).then(() => {
      message.author.send(`${JSON.stringify(fateDeck)}`);
    })
  }
}