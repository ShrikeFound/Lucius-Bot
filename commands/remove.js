const { findSuit } = require('../dealer.js');
module.exports = {
  name: 'remove',
  description: 'removes a card with the given value from your twist deck. Use `!remove [value] [suit]`',
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
    const admin = require('firebase-admin');
    const guildID = message.channel.guild.id
    const userID = message.author.id
    let card = null
    const deckString = `channels/${guildID}/users/${userID}/twist_deck/cards`
    let db = admin.database();
    deckRef = db.ref(deckString)
    if (suit === "crows" | suit === "tomes" | suit === "rams" | suit === "masks") {
      console.log("searching by value & suit");
      valueSuit = `${value}_${suit}`
      console.log(valueSuit)
      deckRef.orderByChild("value_suit").equalTo(valueSuit).limitToFirst(1).once("child_added", (snapshot) => {
        card = snapshot.val();
        console.log(card);
      
        const deleteString = `channels/${guildID}/users/${userID}/twist_deck/cards/${snapshot.key}`
        const deleteRef = db.ref(deleteString)
        deckRef.off("child_added")
        deleteRef.remove().then(() => {
          console.log("card removed.")
          message.reply("card removed: " + JSON.stringify(card))
          return;
        }).catch((error) => {
          console.log('error deleting card: '+error)
        })
      
      
      })
    } else {
      console.log("searching by value alone");
      deckRef.orderByChild("value").equalTo(value).limitToFirst(1).once("child_added", (snapshot) => {
        card = snapshot.val();
        console.log(card);

        const deleteString = `channels/${guildID}/users/${userID}/twist_deck/cards/${snapshot.key}`
        const deleteRef = db.ref(deleteString)
        deckRef.off("child_added")
        deleteRef.remove().then(() => {
          console.log("card removed.")
          message.reply("card removed: " + JSON.stringify(card))
          return;
        }).catch((error) => {
          console.log('error deleting card: '+error)
        })


      })
    }


  }
}



  //  deckRef.orderByChild("value").equalTo(value).on("child_added", (snapshot) => {
  //     card = snapshot.val();
      
  //     console.log(card);
  //     //check if user entered a suit
  //     if (suit === "crows" | suit === "tomes" | suit === "rams" | suit === "masks") {
  //       if (card.suit === suit) {
  //         console.log("user entered a suit and it fits this card!");
  //         removedCard = card;
  //         const deleteString = `channels/${guildID}/users/${userID}/twist_deck/cards/${snapshot.key}`
  //         const deleteRef = db.ref(deleteString)
  //         deckRef.off("child_added")
  //         deleteRef.remove().then(() => {
  //           console.log("card removed.")
  //           message.reply("card removed: " + JSON.stringify(card))
  //           return;
  //         }).catch((error) => {
  //           console.log('error deleting card: '+error)
  //         })
  //         return;
  //       }
  //     } else {
  //       console.log("user didn't enter a suit, deleting first matching value")
  //       removedCard = card;
  //       const deleteString = `channels/${guildID}/users/${userID}/twist_deck/cards/${snapshot.key}`
  //       const deleteRef = db.ref(deleteString)
  //       deckRef.off("child_added")
  //         deleteRef.remove().then(() => {
  //           console.log("card removed.")
  //           message.reply("card removed: " + JSON.stringify(card))
  //           return;
  //         }).catch((error) => {
  //           console.log('error deleting card: '+error)
  //         })
  //         return;
  //     }
  //   });