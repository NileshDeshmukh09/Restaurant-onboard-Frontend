import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router';
import Vuelidate from 'vuelidate';
import router from './router'
import VueToast from 'vue-toast-notification';
import { BootstrapVueIcons , BootstrapVue } from 'bootstrap-vue';

import 'vue-toast-notification/dist/theme-sugar.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
// import BootstrapVue from 'bootstrap-vue';


Vue.config.productionTip = false
Vue.use(Vuelidate);
Vue.use(Router);
Vue.use( VueToast, {
  position : 'top-right',
});
Vue.use( BootstrapVue );
Vue.use( BootstrapVueIcons );

new Vue({
  router,
  VueToast,
  render: h => h(App),
}).$mount('#app')
