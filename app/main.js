import Vue from 'nativescript-vue';
import App from './src';

import store from './src/store';
import { HTTP } from './src/utils/http-common';

  
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');
Vue.prototype.$http = HTTP;


new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
