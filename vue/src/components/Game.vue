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
import { gameState } from '../store'
import PlayCard from './PlayCard.vue'

export default {
  name: 'game',
  components: {
    PlayCard
  },
  computed: {
    cards() {
      return gameState.cards;
    }
  },
  methods: {
    clickCard(card) {
      if(card.isFaceUp){
        console.log('face up!');
        return;
      }
      card.isFaceUp = true;
      console.log('face down!');
    }
  }
}
</script>
<style scoped>

</style>