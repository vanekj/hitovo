import Vue from 'vue';
import Buefy from 'buefy';

import Hitovo from './Hitovo.vue';

Vue.use(Buefy);

new Vue({
	render: (h) => h(Hitovo)
}).$mount('#app');
