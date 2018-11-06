import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../pages/HomePage.vue';
import Article from '../pages/article.vue';
import MainPage from '../pages/cnbeta-mainpage.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/mainpage',
        }, {
            path: '/homepage',
            name: 'HomePage',
            component: HomePage,
            meta: {
                keepAlive: true,
            }
        }, {
            path: '/article/:sid',
            name: 'Article',
            component: Article,
        }, {
            path: '/mainpage',
            name: 'MainPage',
            component: MainPage,
        },
    ]
});
