// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

//组件资源
import Vote from './components/Vote';
import Home from './components/Home';

//VUEX数据
import store from './store';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);

const routes = [{
	path: '/',
	component: Home
}, {
	path: '/home',
	component: Home
}, {
	path: '/vote/:id',
	component: Vote,
	name: 'vote',
	//命名路由 http://router.vuejs.org/zh-cn/essentials/named-routes.html
}, {
	path: '/vote',
	component: Vote,
	name: 'vote/0'
}];

const router = new VueRouter({
	//mode: 'history',//启用后URL中无#字符，需做后端apache/nginx配置
	routes
});

/* eslint-disable no-new */
var vm = new Vue({
	store,
	router,
	el: '#app',
	template: '<router-view/>',
	components: {
		Home
	}
});