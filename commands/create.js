const {createDeck} = require('../dealer.js')
module.exports = {
  name: 'create',
  description: 'this is the description for the create command',
  async execute(bot,message, args) {
    console.log("creating control hand!");
    
    definining_suit = args[0] || "unknown";
    ascendant_suit = args[1] || "unknown";
    center_suit = args[2] || "unknown";
    descendant_suit = args[3] || "unknown";
    console.log(definining_suit,ascendant_suit,center_suit,descendant_suit)
    const controlHand = createDeck(definining_suit, ascendant_suit, center_suit, descendant_suit);
    console.log(controlHand)

    const admin = require('firebase-admin');
    const guildID = message.channel.guild.id
    const userID = message.author.id
    const userString = `channels/${guildID}/users/${userID}`
    let db = admin.database();
    let userRef = db.ref(userString);
    userRef.once("value", ((snapshot)=> {
      console.log(snapshot.val());
      userRef.update({ "id": userID })
      // const controlHand = createDeck()
    }))

    
  }
}