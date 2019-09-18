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
