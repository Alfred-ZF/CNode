<template>
  <div class="article">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt>
    </div>
    <div v-else>
      <div class="topic_header">
        <div class="topic_title"> <h2>{{posts.title}}</h2> </div>
        <ul>
          <li>• 发布于{{posts.create_at | formatDate}}</li>
          <li>• 作者:
            <router-link :to="{name:'user_info',params:{name:posts.author.loginname,id:posts.id}}">
            {{posts.author.loginname}}
            </router-link>
            </li>
          <li>• {{posts.visit_count}}次分享</li>
          <li>• 来自:{{posts | tabFormatter}}</li>
        </ul>
        <div v-html="posts.content" class="topic_content markdown-body"></div>
      </div>
      <div id="reply" class="markdown-body">
        <div class="topbar"><span>{{posts.replies.length}} 回复</span></div>
        <div v-for="(reply,index) in posts.replies" class="replySec">
          <div class="replyUp">
            <router-link :to="{name:'user_info',params:{name:reply.author.loginname}}">
              <img :src="reply.author.avatar_url">
            </router-link>
            <router-link :to="{name:'user_info',params:{name:reply.author.loginname}}">
              <span class="loginname">{{reply.author.loginname}}</span>
            </router-link>
            <span>
              {{index+1}}楼
            </span>
            <span v-if="reply.ups.length > 0">
              ☝{{reply.ups.length}}
            </span>
            <span v-else>

            </span>
          </div>
          <div class="reply_content" v-html="reply.content">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      isLoading: false,
      posts: {}
    };
  },
  methods: {
    getData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.isLoading = false;
          this.posts = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  },
  watch:{//监控页面的路由变化，如果路由仍旧指向当前页面类似的路由地址，则通过 watch 监控并重新发送请求
    '$route'(to,from){
      this.getData()
    }
  }
};
</script>

<style>
@import url("../assets/github-markdown.css");

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 38px;
  font-size: 14px;
  color: #444;
  /* margin-top: 10px; */
}

.article:not(:first-child) {
  margin-right: 340px;
  margin-top: 15px;
}

#reply,
.topic_header {
  background-color: #fff;
}

#reply {
  margin-top: 18px;
}

#reply img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
  border-radius: 3px;
}

#reply a,
#reply .replyUp span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
  margin-left: 5px;
}

#reply .replyUp .loginname{
  margin-left: 10px;
} 

.reply_content{
  padding: 0 0 0 50px;
  font-size: 15px;
}

.reply_content p {
  margin: 2px 0 10px;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 10px;
}

.loading {
  text-align: center;
  padding-top: 300px;
}

.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}

.replyUp{
  margin-top: -5px;
  padding-top: 0px;
}

.topic_header {
  padding: 10px;
}

.topic_ {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}

.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}

.topic_header li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}

.topic_header ul li{
  list-style-type: disc !important
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}

.markdown-text img {
  width: 92% !important;
}
</style>