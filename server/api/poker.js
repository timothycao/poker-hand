const router = require('express').Router();
module.exports = router;

const valuesMap = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
  ACE: 14
};

let values = [];
let suits = [];

let message = '';

const duplicates = () => {
  let counts = {};

  for (let i = 0; i < values.length; i++) {
    if (counts[values[i]] === undefined) {
      counts[values[i]] = 1;
    } else {
      counts[values[i]]++;
    }
  }

  return counts;
};

const isFlush = () => {
  return new Set(suits).size === 1;
};

const isStraight = () => {
  let sortedValues = values.sort((a, b) => a - b);

  for (let i = 0; i < values.length - 1; i++) {
    if ((sortedValues[i + 1] - sortedValues[i] !== 1)) {
      return false;
    }
  }

  return true;
}

const analyze = () => {
  switch (Object.values(duplicates()).filter(count => count > 1).join('')) {
    case '2':
      message = 'You got a Pair!';
      break;
    case '22':
      message = 'You got Two Pairs!';
      break;
    case '3':
      message = 'You got Three of a Kind!';
      break;
    case '23':
    case '32':
      message = 'You got Full House!';
      break;
    case '4':
      message = 'You got Four of a Kind!';
      break;
    default:
      if (isFlush() && isStraight()) {
        message = 'You got a Straight Flush!';
      } else if (isFlush()) {
        message = 'You got a Flush!';
      } else if (isStraight()) {
        message = 'You got a Straight!';
      } else {
        message = 'Nothing here...'
      }
      break;
  }
}

router.post('/analyze', async (req, res, next) => {
  const {hand} = req.body;

  values = [];
  suits = [];

  hand.map((card) => {
    values.push(valuesMap[card.value]);
    suits.push(card.suit);
  });

  analyze();

  res.status(200).send(message);
});
