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
import PlayCard from './PlayCard.vue'

export default {
  name: 'game',
  components: {
    PlayCard
  },
  data() {
    return {
      cards: [
        {
          id: 'asdf',
          nl: 'muis',
          isTextVisible: false
        }
      ]
    }
  },
  methods: {
    clickCard(card) {
      if(card.isTextVisible){
        return;
      }

    }
  }
}
</script>
<style scoped>

</style>