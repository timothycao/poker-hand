let currentDeck = ''; // currentDeck is used to specify a deck for shuffle and draw API requests
let hand = [];  // hand is used to store the cards provided from a draw API request

const newDeck = document.querySelector('#new-deck');

newDeck.addEventListener('click', async () => {
  const {data} = await axios.get('/api/deck/new'); // axios request to the server which will make a Deck of Cards API request for a new deck

  if (data.success) { // success is a boolean provided in the response from Deck of Cards API requests
    currentDeck = data.deck_id; // id is provided for every deck created -- only one deck is used at a time for this app

    document.querySelector('#deck').src = 'images/card-back.png';
    document.querySelector('#deck').classList.add('card-hover');
    [1, 2, 3, 4, 5].map((num) => {
      document.querySelector(`#card-${num}`).src = 'images/placeholder.png';
      document.querySelector(`#card-${num}`).classList.remove('card-hover');
    });
    document.querySelector('#message').innerHTML = `You have created an unshuffled deck of ${data.remaining} cards.`;

    console.log(`You have created an unshuffled deck of ${data.remaining} cards.`);

  } else {
    document.querySelector('#message').innerHTML = 'New deck unsuccessful.';

    console.log('New deck unsuccessful.');

  }
});

const shuffle = document.querySelector('#shuffle');

shuffle.addEventListener('click', async () => {
  const {data} = await axios.put(`/api/deck/${currentDeck}/shuffle`); // axios request to the server which will make a Deck of Cards API request to shuffle the existing deck

  if (data.success) { // success is a boolean provided in the response from Deck of Cards API requests
    document.querySelector('#message').innerHTML = 'You have shuffled the deck.';

    console.log('You have shuffled the deck.');

  } else {
    document.querySelector('#message').innerHTML = 'Shuffle unsuccessful.';

    console.log('Shuffle unsuccessful.');

  }
});

const draw = document.querySelector('#draw');

draw.addEventListener('click', async () => {
  let num = 5;
  const {data} = await axios.put(`/api/deck/${currentDeck}/draw/${num}`); // axios request to the server which will make a Deck of Cards API request to draw cards from the existing deck

  if (data.success) { // success is a boolean provided in the response from Deck of Cards API requests
    hand = data.cards; // an array of card objects are provided in the response from a draw request to the Deck of Cards API

    data.cards.map((card, index) => {
      console.log(`You drew a ${card.value} of ${card.suit}.`);

      document.querySelector(`#card-${index + 1}`).src = card.image;
      document.querySelector(`#card-${index + 1}`).classList.add('card-hover');
    });
    document.querySelector('#message').innerHTML = `There are ${data.remaining} cards left in the deck. Analyze for the best hand.`;

    console.log(`There are ${data.remaining} cards left in the deck.`);

  } else {
    document.querySelector('#message').innerHTML = 'Draw unsuccessful.';

    console.log('Draw unsuccessful.');

  }
});

const analyze = document.querySelector('#analyze');

analyze.addEventListener('click', () => {

  let values = [];
  let suits = [];

  hand.map((card) => {
    values.push(valuesMap[card.value]); // valuesMap is defined in the poker script for converting card values to numbers
    suits.push(card.suit);
  });

  const message = analyzeHand(values, suits); // analyzeHand is defined in the poker script for identifying the best poker hand

  document.querySelector('#message').innerHTML = message + ' Draw again for another result.';

  console.log(message);

});
