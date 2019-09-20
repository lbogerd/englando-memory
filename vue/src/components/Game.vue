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
        case 0:
        case 1:
          card.isFaceUp = true;
          break;

        // Two cards have been played; time for the the next turn. 
        case 2:
          if (this.cardsCurrentlyFaceUp[0].pairId 
            == this.cardsCurrentlyFaceUp[1].pairId) {
            // Player has won the round.
            mutations.awardPairOfCardsToCurrentPlayer(card.pairId);
            mutations.removePairOfCards(card.pairId);
            // Re-init game if no more cards are left.
            if (this.cards.filter(c => c.isVisible === true).length === 0) {
              mutations.initGame();
            }
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
  .play-field{
    display: flex;
    flex-wrap: wrap;
  }
</style>