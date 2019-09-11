const valuesMap = { // used to convert card values to numbers
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

const countValues = (values) => { // used to count the occurrences of each value in a hand
  let counts = {};

  for (let i = 0; i < values.length; i++) {
    if (counts[values[i]] === undefined) {
      counts[values[i]] = 1;
    } else {
      counts[values[i]]++;
    }
  }

  return counts;  // return an object
};

const isFlush = (suits) => {  // used to check whether there is only one suit in a hand
  return new Set(suits).size === 1; // returns a boolean
};

const isStraight = (values) => {  // used to check whether the values in a hand are consecutive when sorted
  let sortedValues = values.sort((a, b) => a - b);

  for (let i = 0; i < values.length - 1; i++) {
    if ((sortedValues[i + 1] - sortedValues[i] !== 1)) {
      return false; // returns boolean
    }
  }

  return true;  // returns boolean
}

const analyzeHand = (values, suits) => {  // used to ultimately identify the best poker hand
  let message = '';

  switch (Object.values(countValues(values)).filter(count => count > 1).join('')) { // removes single occurrences from object and stringifies remaining value occurrences
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
      if (isFlush(suits) && isStraight(values)) { // checks for the best option first
        message = 'You got a Straight Flush!';
      } else if (isFlush(suits)) {
        message = 'You got a Flush!';
      } else if (isStraight(values)) {
        message = 'You got a Straight!';
      } else {
        message = 'Nothing here...'
      }
      break;
  }
  return message; // returns a message identifying the best poker hand
};

module.exports = {  // exported for test specs
  countValues,
  isFlush,
  isStraight,
  analyzeHand
};
