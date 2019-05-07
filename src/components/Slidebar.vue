<template>
  <div class="authorinfo">
    <div class="authorsumary">
      <div class="topbar">作者</div>
      <router-link :to="{name:'user_info',params:{name:userInfo.loginname}}">
        <img :src="userInfo.avatar_url">
        <span class="userName">{{userInfo.loginname}}</span>
      </router-link>
      <p class="score">积分：{{userInfo.score}}</p>

    </div>
    <div class="recent_topics">
      <div class="topbar">作者最近主题</div>
      <ul>
        <li v-for="topic in limitFiveTopicsData">
          <!-- 点击跳转后，在同一个路由内检测不到发生变化！！！ -->
          <router-link :to="{name:'post_content',params:{id:topic.id,name:topic.author.loginname}}">
            {{topic.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="topbar">作者最近回复</div>
      <ul>
        <li v-for="topic in limitFiveRepliesData">
          <!-- 点击跳转后，在同一个路由内检测不到发生变化！！！ -->
          <router-link :to="{name:'post_content',params:{id:topic.id,name:topic.author.loginname}}">
            {{topic.title}}
          </router-link>
        </li>
      </ul>
    </div class="recent_replies">
  </div>
</template>

<script>
  export default {
    name:'SlideBar',
    data(){
      return {
        userInfo:{}
      }
    },
    methods:{
      getData() {
        this.$http
          .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then(res => {
            this.isLoading = false;
            this.userInfo = res.data.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    computed:{
      limitFiveTopicsData(){
        if (this.userInfo.recent_topics) {
          return this.userInfo.recent_topics.slice(0,5)
        }
      },
      limitFiveRepliesData(){
        if (this.userInfo.recent_replies) {
          return this.userInfo.recent_replies.slice(0,5)
        }
      }
    },
    beforeMount(){
      this.getData()
    },
    watch:{//监控页面的路由变化，如果路由仍旧指向当前页面类似的路由地址，则通过 watch 监控并重新发送请求
      '$route'(to,from){
        this.getData()
    }
  }
  }
</script>

<style scoped>
.authorsumary, .recent_replies, .recent_topics {
    position: relative;
    background-color: #fff;
  }
  .authorinfo {
    width: 328px;
    float: right;
    margin-top: 0;
  }
  li{
    padding: 3px 0 ;
  }
  .recent_replies ul, .recent_topics ul {
    margin-top: 0px;
    margin-bottom: 0px;
    list-style: none;
    padding-left: 14px;
  }

  ul a {
    font-size: 12px;
    text-decoration: none;
    color: #778087;
  }

  .topbar {
   
    padding: 10px;
    background-color: #f6f6f6;
    height: 36px;
    font-size: 12px;
    margin-top: 10px;

  }

  .authorsumary .userName{
    position: absolute;
    top: 62px;
    left: 70px;
  }

  .authorsumary .score{
    margin-left: 12px;
    padding-bottom: 10px;
  }

  img {
    height: 48px;
    width: 48px;
    border-radius: 3px;
    margin: 10px;
  }

  .loginname {
    width: 100px;
    float: right;
    margin-top: 22px;
    margin-right: 159px;
    font-size: 14px;
  }

  .loginname a {
    text-decoration: none;
    color: #778087;
  }

  .authorsumary .topbar {
    margin-top: 0px;
  }
</style>