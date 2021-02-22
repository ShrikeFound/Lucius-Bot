const {shuffle} = require('../dealer.js')
module.exports = {
  name: 'shuffle_twist',
  description: "shuffles the user's twist deck.",
  async execute(bot, message, args) {
    
    if (!message.channel.guild) {
      message.reply("Please try this command in a text channel.")
      return
    }

    const admin = require('firebase-admin');
    const guildID = message.channel.guild.id
    const userID = message.author.id
    const deckString = `channels/${guildID}/users/${userID}/twist_deck`
    let db = admin.database();
    let deckRef = db.ref(deckString);
    deckRef.once("value", (snapshot) => {
      fateDeck = snapshot.val();
      shuffle(fateDeck);
      deckRef.set(fateDeck);
    }).then(() => {
      message.reply("Twist deck shuffled.");
    })
  }
}