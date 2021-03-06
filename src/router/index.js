import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

// 这里为什么不导出一个router实例？
// 每次用户请求都需要创建router实例
export default function createRouter() {
	return new VueRouter({
		mode: 'history',
		base: process.env.BASE_URL,
		routes: [
			{
				path: '/',
				name: 'Home',
				component: Home,
			},
			{
				path: '/about',
				name: 'About',
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
			},
		],
	});
}
