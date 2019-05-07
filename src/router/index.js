import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import UserInfo from '../components/UserInfo'
import Slidebar from '../components/Slidebar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main:PostList
      }
    },
    {
      name:'post_content',
      path:'/topic/id=:id&author=:name',
      components:{
        main:Article,
        Slidebar:Slidebar
      }
    },
    {
      name:'user_info',
      path:'/user/:name',
      components:{
        main:UserInfo
      }
    }
  ]
})
