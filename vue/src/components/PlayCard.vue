<template>
  <div 
    class="flip-card"
  >
    {{ card.nl }}
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
  methods: {
    clickCard: function () {
    }
  }
}
</script>