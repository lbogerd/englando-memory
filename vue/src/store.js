import Vue from "vue";

export const pairs = Vue.observable({
  animals: [
    {
      id: 'asdf',
      nl: 'aap',
      en: 'monkey'
    },
    {
      id: 'fdas',
      nl: 'koe',
      en: 'cow'
    }
  ],
})

export const gameState = Vue.observable({
  players: {
    firstPlayer: {
      name: 'Speler 1',
    },
    secondPlayer: {
      name: 'Speler 2'
    }
  },
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

    // Generate cards from pairs.
    pairs
      .animals
      .forEach(p => {
        // TODO: Deduplicate code below.
        gameState
          .cards
          .push({
            id: generateRandomId(),
            pairId: p.id,
            text: p.nl,
            isFaceUp: false
          });
        
        gameState
          .cards
          .push({
            id: generateRandomId(),
            pairId: p.id,
            text: p.en,
            isFaceUp: false
          })
      });
    
    // Shuffle them.
    this.shuffleCards();
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
  }

}