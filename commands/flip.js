const {shuffle} = require('../dealer.js')
module.exports = {
  name: 'flip',
  description: 'Show the fate deck.',
  async execute(bot, message, args) {
    console.log("flipping..");
    let numFlips = args.join(" ").match(/\d+/)
    if (!numFlips || !(args.join(" ").match(/\d+/)[0] > 0)) {
      numFlips = 1;
    } else {
      numFlips = numFlips[0]
    }
    const flippedCards = []
    console.log(numFlips)
    const admin = require('firebase-admin');
    const guildID = message.channel.guild.id
    const channelString = `channels/${guildID}`
    let db = admin.database();
    let channelRef = db.ref(channelString);


    channelRef.once('value', (data) => {
      if (data.val().fate_deck) {
        deckRef = db.ref(channelString + "/fate_deck")
        
        for (let i = 0; i < numFlips; i++) {
          deckRef.once('value', (snapshot) => {
            let fateDeck = snapshot.val();
            fateDeck.hand = snapshot.val().hand || []
            fateDeck.discard = snapshot.val().discard || []
            fateDeck.cards = snapshot.val().cards || []
            if (fateDeck.cards.length <= 0) {
              if (fateDeck.discard.length <= 0) return;
              fateDeck.cards = fateDeck.discard;
              fateDeck.discard = [];
              shuffle(fateDeck);
              deckRef.update(fateDeck)
            }
            flippedCard = fateDeck.cards.shift();
            flippedCards.push(flippedCard);
            fateDeck.hand.push(flippedCard)
            deckRef.update(fateDeck)
          });
          
        }

        deckRef.once('value', (snapshot) => {
          let discard = snapshot.val().discard || [];
          const hand = snapshot.val().hand;
          discard = discard.concat(hand)
          deckRef.update({ "hand": [] })
          deckRef.update({ "discard": discard })
        })

      } else {
        //whoops. error code of some sort.
        console.log("couldn't find a deck to flip...");
      }
    }).then((results) => {
      console.log("done!");
      console.log(flippedCards);
      message.reply(`Cards flipped: ${JSON.stringify(flippedCards)}`);
    });

  }
}
