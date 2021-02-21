import '@/style/main.sass';
import App from '@/App.vue'
import store from '@/store'

import Vue from 'vue'

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
