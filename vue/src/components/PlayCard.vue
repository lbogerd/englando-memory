<template>
  <div 
    class="flip-card"
    :id="card.id"
    :class="{'flip-card-go': card.isFaceUp}"
  >
    <div class="flip-card-inner">
      <div class="flip-card-front"></div>
      <div class="flip-card-back">{{ card.text }}</div>
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
  }  
}
</script>