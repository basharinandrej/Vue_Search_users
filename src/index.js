//import '@/style/main.sass';
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'

import Vue from 'vue'

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
