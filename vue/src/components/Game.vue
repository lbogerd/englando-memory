<template>
  <div class="play-field">
    <play-card
      v-for="card in cards"
      :key="card.id"
      :card="card"
      @click.native="clickCard(card)"
    >

    </play-card>
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
      if(this.cardsCurrentlyFaceUp.length >= 2){
        mutations.allCardsToFaceDown();
        return;
      }

      card.isFaceUp = true;
    }
  }
}
</script>
<style scoped>

</style>