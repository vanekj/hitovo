import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import Coffee from './Coffee.vue';

Vue.use(Buefy);

new Vue({
	render: (h) => h(Coffee)
}).$mount('#app');
