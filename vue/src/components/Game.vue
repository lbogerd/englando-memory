<template>
  <div class="play-field">
    <play-card
      v-for="card in cards"
      :key="card.id"
      :card="card"
      @click.native="clickCard(card)"
    ></play-card>
  </div>
</template>
<script>
import { gameState, mutations } from '../store'
import PlayCard from './PlayCard.vue'

export default {
  name: 'game',
  components: {
    PlayCard
  },
  computed: {
    cards() {
      return gameState.cards;
    },
    cardsCurrentlyFaceUp() {
      return gameState
        .cards
        .filter(c => c.isFaceUp);
    }
  },
  methods: {
    clickCard(card) {
      switch (this.cardsCurrentlyFaceUp.length) {
        // Fresh game, always turn the card.
        case 0:
          card.isFaceUp = true;
          break;

        /* Switch cardsCheck for pairs, process it another time to
        to handle the turn end logic. */ 
        case 1:
          card.isFaceUp = true;
          clickCard(card);
          break;

        // Two cards are played; time for the the next turn. 
        case 2:
          if (this.cardsCurrentlyFaceUp[0].pairId 
            == this.cardsCurrentlyFaceUp[1].pairId) {
            // Player has won the round.
            // mutations.awardPairOfCardsToCurrentPlayer(card.pairId);
            // mutations.removePairOfCards(card.pairId);
          } else {
            // Player lost, switch player.
            gameState.isTurnOwnedByFirstPlayer 
              = !gameState.isTurnOwnedByFirstPlayer;
          }
          gameState.turnNumber++;
          mutations.allCardsToFaceDown();
          break;

        // Fallback, should never be called(?)
        default:
          mutations.allCardsToFaceDown();
          break;
      }
    }
  }
}
</script>
<style scoped>

</style>