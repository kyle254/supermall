import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopcar = () => import('../views/shopcar/Shopcar')
const Profile = () => import('../views/profile/Profile')
const Detial = () => import('../views/detail/Detail')


// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
   // 配置映射关系
   {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component: Home
  },
  {
   path: '/category',
   component:Category
 },
 {
   path: '/shopcar',
   component:Shopcar
 },
 {
   path: '/profile',
   component:Profile
 },
 {
  path: '/detail/:iid',
  component:Detial
},
]
const router = new VueRouter({
    routes,
    mode:'history'
})

export default router