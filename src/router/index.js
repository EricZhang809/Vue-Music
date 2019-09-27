import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve=>require(['@/pages/index/index'],resolve),
      redirect:'/index'
    },{
      path: '/index',
      name: 'index',
      component: resolve=>require(['@/pages/index/index'],resolve),
      redirect:'/index/commend',
      children:[{
        path:'commend',
        name:'commend',
        component: resolve=>require(['@/components/commend'],resolve)
      },{
        path:'rank',
        name:'rank',
        component:resolve=>require(['@/components/rank'],resolve)
      },{
        path:'search',
        name:'search',
        component:resolve => require(['@/components/search'],resolve)
      }]
    }
  ]
})
