import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.config.productionTip = false
Vue.prototype.dateFormate = function (str1, str2) {
  let date = new Date(str1);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return str2.replace("yyyy", year).replace("mm", month).replace("dd", day);


}

const i18n = new VueI18n({
  locale: 'zh',   // 语言标识 //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh': require('./VueI18n/zh'),
    'en': require('./VueI18n/en')
  }
})




new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
