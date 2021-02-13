
const createDeck = (suits, values, center, descendant) => {
  var deck = {};
  deck.cards = new Array();
  deck.discard = new Array();
  deck.hand = new Array();
  if (suits && values && center && descendant) {
    console.log("creating twist deck");
    //create defining cards
    definining_values = [1, 5, 9, 13];
    ascendant_values = [4, 8, 12];
    center_values = [3, 7, 11];
    descendant_values = [2, 6, 10];

    function add_twist_set(values, suit) {
      suit = findSuit(suit);
      values.forEach((value) => {
        var card = { value: value, suit: suit };
        deck.cards.push(card);
      });
    }

    add_twist_set(definining_values, suits);
    add_twist_set(ascendant_values, values);
    add_twist_set(center_values, center);
    add_twist_set(descendant_values, descendant);
  } else {
    console.log("creating fate deck");
    for (var i = 0; i < suits.length; i++) {
      for (var j = 0; j < values.length; j++) {
        var card = { value: values[j], suit: suits[i] };
        deck.cards.push(card);
      }
    }
    deck.cards.push({ value: 0, suit: "Black Joker" })
    deck.cards.push({value: 14, suit: "Red Joker" })
  }
  shuffle(deck);
  return deck;
}

const findSuit = (string) => {
  char = string.trim().charAt(0).toLowerCase();
  suit = "";
  
  switch (char) {
    case "m":
      suit = "masks";
      break;
    case "r":
      suit = "rams";
      break;
    case "c":
      suit = "crows";
      break;
    case "t":
      suit = "tomes";
      break;
    default:
      suit = "outcasts";
      break;
  }
  return suit;
}

const draw = (deck, numflips) => {
  console.log("drawing...");
  let drawnCards = []
  deck.cards = deck.cards || [];
  deck.hand = deck.hand || [];
  deck.discard = deck.discard || [];
  for (let i = 0; i < numflips; i++){
    if (deck.cards.length <= 0) {
      console.log("no more cards in twist deck")
      if (deck.discard.length <= 0) break;
      deck.cards = deck.discard;
      shuffle(deck);
    }
    let drawnCard = deck.cards.shift();
    drawnCards.unshift(drawnCard);
  }

  deck.hand = deck.hand.concat(drawnCards);

  deck.hand.sort((a, b) => {
    return a.value - b.value;
  });

}


const cheat = (deck, value, suit) => {
  deck.hand = deck.hand || [];
  deck.discard = deck.discard || [];
  console.log(deck.hand);
  console.log(typeof value);
  let cheatedCard = deck.hand.find(card => {
    return card.value === value;
  });
  if (!cheatedCard) {
    return cheatedCard
  }
  deck.hand = deck.hand.filter(card => {
    return card.value !== value;
  })
  deck.discard = deck.discard.concat(cheatedCard);

  return cheatedCard;
}


const test = () => {
  console.log('dealer activated!');
}

const shuffle = (deck) => {
  console.log("length before:",deck.cards.length,deck.discard && deck.discard.length);
  console.log("shuffling...");
  deck.cards = deck.cards.concat(deck.discard || []);
  deck.cards = deck.cards.concat(deck.hand || []);
  deck.discard = [];
  deck.hand = [];
  for (var i = 0; i < 1000; i++) {
    var randomLocation = Math.floor(Math.random() * deck.cards.length);
    var temp = deck.cards[0];
    deck.cards[0] = deck.cards[randomLocation];
    deck.cards[randomLocation] = temp;
  }
  console.log("length after:",deck.cards.length,deck.discard && deck.discard.length);
}


module.exports = {
  createDeck,test,shuffle,draw,findSuit,cheat
}