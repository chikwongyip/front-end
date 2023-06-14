import Vue from 'vue'
import ElementUI from "element-ui";
import axios from "axios"
import "element-ui/lib/theme-chalk/index.css";
import App from './App.vue'
Vue.use(ElementUI)
Vue.use(VueAxios,axios)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
