import Vue from 'vue'
import App from './App.vue'
import { mutations } from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // Old school function format as using an arrow function
  // will not let us access 'this'.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  mounted: function() {
    this.$nextTick(() => {
        mutations.initGame();
      })
  }
}).$mount('#app')
