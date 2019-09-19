import Vue from "vue";

export const pairs = Vue.observable([
  {
    id: 'zysh2',
    nl: 'Aap',
    en: 'Monkey'
  },
  {
    id: '12jah',
    nl: 'Koe',
    en: 'Cow'
  },
  // {
  //   id: 'ufg32',
  //   nl: 'Kat',
  //   en: 'Cat'
  // },
  // {
  //   id: 'bm8yh',
  //   nl: 'Hond',
  //   en: 'Dog'
  // },
  // {
  //   id: '8hn1d',
  //   nl: 'Horde',
  //   en: '🤢'
  // },
  // {
  //   id: '0nh1k',
  //   nl: 'Alliance',
  //   en: '🎉'
  // }
])
 
export const gameState = Vue.observable({
  players: [
    {
      id: 'firstPlayer',
      name: 'Speler 1',
      ownedPairs: []
    },
    {
      id: 'secondPlayer',
      name: 'Speler 2',
      ownedPairs: []
    }
  ],
  isTurnOwnedByFirstPlayer: true,
  turnNumber: 1,
  cards: []
});

export const mutations = {
  initGame() {
    /* Used to make card ID's unique per game to prevent simple 
    'inspect mode cheating'. */
    function generateRandomId() {
      return Math
        .random()
        .toString(36)
        .substr(2, 5);
    }

    // Make sure no cards already exist.
    gameState.cards = [];
    
    // Generate cards from pairs.
    pairs
      .forEach(p => {
        // TODO: Deduplicate code below.
        gameState
          .cards
          .push({
            id: generateRandomId(),
            pairId: p.id,
            text: p.nl,
            isFaceUp: false,
            isVisible: true
          });
        
        gameState
          .cards
          .push({
            id: generateRandomId(),
            pairId: p.id,
            text: p.en,
            isFaceUp: false,
            isVisible: true
          })
      });
    
    // Shuffle them.
    this.shuffleCards();

    // Randomise starting player.
    gameState.isTurnOwnedByFirstPlayer = ( Math.random() >= 0.5 )
  },
  allCardsToFaceDown() {
    /* TOLEARN: Run quick benchmark to see if filtering
    the cards first is more or less efficient. */
    gameState
      .cards
      .forEach(c => {
        c.isFaceUp = false;
      })
  },
  shuffleCards() {
    let array = gameState.cards;
    /* Durstenfeld shuffle algorithm.
    Source: https://stackoverflow.com/a/12646864 */
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  },
  awardPairOfCardsToCurrentPlayer(pairId) {
    if (gameState.isTurnOwnedByFirstPlayer) {
      gameState.players[0].ownedPairs.push(pairId);
    } else {
      gameState.players[1].ownedPairs.push(pairId);
    }
  },
  removePairOfCards(pairId) {
    gameState
      .cards
      .filter(c => c.pairId === pairId)
      .forEach(c => c.isVisible = false);
  }
}