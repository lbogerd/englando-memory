<template>
  <div 
    class="flip-card"
    :id="card.id"
    :class="{
      'flip-card-go': card.isFaceUp,
      'flip-card-hide': !card.isVisible
    }"
  >
    <div class="flip-card-inner">
      <div class="flip-card-front"></div>
      <div class="flip-card-back">{{ dynamicText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    /* Do not display text when face down
    to prevent 'inspect mode cheating'. */
    dynamicText: function () {
      return this.card.isFaceUp
        ? this.card.text
        : ''
    }
  }
}
</script>

<style scoped>
  .flip-card-hide {
    visibility: hidden;
  }
</style>