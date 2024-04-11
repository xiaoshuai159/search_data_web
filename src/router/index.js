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
      redirect:'/info1',
      children:[{
        path: '/info1',
        name: 'info1',
        component: info1,
        meta:{
          keepAlive:true
        }
      },{
        path: '/info2',
        name: 'info2',
        component: info2,
        meta:{
          keepAlive:true
        }
      },{
        path: '/info3',
        name: 'info3',
        component: info3,
        meta:{
          keepAlive:true
        }
      }]
    },
  ]
})
// router.beforeEach((to, from, next) => {  // 7.6 测试暂时关闭
//   const token = localStorage.getItem('token')
//   // console.log('token为:'+token)
//   if (to.name!=='login'&&!token) next({name:'login'})
//   else next()
// })
export default router