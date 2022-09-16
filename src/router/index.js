import Vue from 'vue'
import Router from 'vue-router'
import login from '@/assets/login.vue'
import infoPage from '@/assets/infoPage.vue'
import info1 from '@/components/info1.vue'
import info2 from '@/components/info2.vue'
import info3 from '@/components/info3.vue'
Vue.use(Router)
 
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/infoPage',
      name: 'infoPage',
      component: infoPage,
      redirect:'/info2',
      children:[{
        path: '/info1',
        name: 'info1',
        component: info1
      },{
        path: '/info2',
        name: 'info2',
        component: info2
      },{
        path: '/info3',
        name: 'info3',
        component: info3
      }]
    },
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  console.log('token为:'+token)
  if (to.name!=='login'&&!token) next({name:'login'})
  else next()
})
export default router