
const createDeck = (suits, values, center, descendant) => {
  var deck = {};
  deck.cards = new Array();
  deck.discard = new Array();
  deck.hand = new Array();
  if (arguments.length == 4) {
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

const test = () => {
  console.log('dealer activated!');
}

const shuffle = (deck) => {
  deck.cards = deck.cards.concat(deck.discard);
  deck.cards = deck.cards.concat(deck.hand);
  deck.discard = [];
  deck.hand = [];
  for (var i = 0; i < 1000; i++) {
    var randomLocation = Math.floor(Math.random() * deck.cards.length);
    var temp = deck.cards[0];
    deck.cards[0] = deck.cards[randomLocation];
    deck.cards[randomLocation] = temp;
  }
  console.log(deck.cards.length);
}


module.exports = {
  createDeck,test,shuffle
}