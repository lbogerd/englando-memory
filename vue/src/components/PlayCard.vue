<template>
  <div 
    class="flip-card"
    :id="card.id"
  >
    <div class="flip-card-inner">
      <div class="flip-card-front"></div>
      <div class="flip-card-back">{{ card.nl }}</div>
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
  
}
</script>