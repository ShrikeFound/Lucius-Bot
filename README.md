# Lucius Bot
 A Discord bot that simulates a fate deck and player twist decks/control hands


## Commands
### Flip | Fate Deck
Flips a number of cards from the fate deck. Omitting a number will flip one (1) card by default.

`!flip [number]`

### Unflip | Fate Deck
Places a number of cards from the discard pile back unto the deck. Useful for when we flip a card too many but don't want to waste a Joker. Omitting a number will unflip one (1) card by default.

`!unflip [number]`

### Shuffle | Control Hand & Fate Deck
This command shuffles either the fate deck or your control hand.

control hand: `!shuffle` | fate deck: `!shuffle_fate`

### Create | Control Hand
Creates a twist deck from the four suits given. Abbreviations are ok, so !create t c r m will work just as well as !create Tomes Crows Rams Masks. The suits should be ordered in descending order.

`!create [defining suit] [ascendant suit] [center suit] [descendant suit]`

### Cheat | Control Hand
Cheats in a card with the given value from your control hand.

`!cheat [value]`

### Draw | Control Hand
Draws a number of cards from your twist deck to your control hand. Omitting a numberwill draw one (1) card by default.

`!draw [number]`

### Undraw | Control Hand
Places a a number of cards back unto the twist deck from your control hand. For when you draw too many cards.

`!undraw [number]`

### Discard | Control Hand
Discards a card with the given value from your control hand.

`!discard [value]`

### Resurrect | Control Hand
places a number of cards from your graveyard back into your hand. For when you cheat a little too early.

`!res [number]`


## Troubleshooting

if Lucius doesn't automatically create a fate deck for your guild, you can type `!private_init` to manually create it.
