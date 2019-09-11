let currentDeck = '';
let hand = [];

const newDeck = document.querySelector('#new-deck');

newDeck.addEventListener('click', async () => {
  const {data} = await axios.get('/api/deck/new');

  if (data.success) {
    currentDeck = data.deck_id;

    document.querySelector('#deck').src = 'images/card-back.png';
    document.querySelector('#message').innerHTML = `You have created an unshuffled deck of ${data.remaining} cards.`;

    console.log(`You have created an unshuffled deck of ${data.remaining} cards.`);

  } else {
    document.querySelector('#message').innerHTML = 'New deck unsuccessful.';

    console.log('New deck unsuccessful.');

  }
});

const shuffle = document.querySelector('#shuffle');

shuffle.addEventListener('click', async () => {
  const {data} = await axios.put(`/api/deck/${currentDeck}/shuffle`);

  if (data.success) {
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
  const {data} = await axios.put(`/api/deck/${currentDeck}/draw/${num}`);

  if (data.success) {
    hand = data.cards;

    data.cards.map((card, index) => {
      console.log(`You drew a ${card.value} of ${card.suit}.`);

      document.querySelector(`#card-${index + 1}`).src = card.image;
    });
    document.querySelector('#message').innerHTML = `There are ${data.remaining} cards left in the deck.`;

    console.log(`There are ${data.remaining} cards left in the deck.`);

  } else {
    document.querySelector('#message').innerHTML = 'Draw unsuccessful.';

    console.log('Draw unsuccessful.');

  }
});

const analyze = document.querySelector('#analyze');

analyze.addEventListener('click', async () => {
  let values = [];
  let suits = [];

  hand.map((card) => {
    values.push(valuesMap[card.value]);
    suits.push(card.suit);
  });

  const message = analyzeCards(values, suits);

  document.querySelector('#message').innerHTML = message + ' Draw again for another result.';

  console.log(message);

});
