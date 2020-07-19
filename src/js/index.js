import "@babel/polyfill";
import Vue from 'vue';

import "../css/style.scss";

import App from './components/App.vue';

new Vue({
    render: h => h(App)
  }).$mount("#app");
  