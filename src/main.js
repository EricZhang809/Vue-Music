// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './store';
import 'mint-ui/lib/style.css';
import BScroll from './components/BScroll';
import {
  Swipe,
  SwipeItem,
  Navbar,
  TabItem,
  Indicator,
  Lazyload,
  Popup,
  Header,
  Button,
  Range,
  Search
} from 'mint-ui';
Vue.component(BScroll.name, BScroll);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Search.name, Search);
Vue.component(Popup.name, Popup);
Vue.component(Header.name, Header);
Vue.component(Range.name, Range);
Vue.component(Button.name, Button);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
