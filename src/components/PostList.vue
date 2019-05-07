<template>
  <div class="PostList">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div class="posts">
      <ul>
        <li>
          <div class="toobar">
            <span class="active" v-on:click="changeStatus">全部</span>
            <span v-on:click="changeStatus">精华</span>
            <span v-on:click="changeStatus">分享</span>
            <span v-on:click="changeStatus">问答</span>
            <span v-on:click="changeStatus">招聘</span>
            <span v-on:click="changeStatus">客户端测试</span>
          </div>
        </li>
        <li v-for="post in posts">

          <!-- 头像 -->
          <router-link :to="{name:'user_info',params:{name:post.author.loginname,id:posts.id}}">
            <img :src="post.author.avatar_url" alt>
          </router-link>

          <!-- 回复/点击 -->
          <span class="allcount">
            <span class="reply_count">{{post.reply_count}}</span>
            /{{post.visit_count}}
          </span>

          <!-- 帖子的分类 -->
          <span :class="[{put_good:(post.good == true),put_top:(post.top == true),'topiclist-tab':(post.good != true && post.top != true)}]">
            <span>{{post | tabFormatter}}</span>
          </span>

          <!-- 标题 -->
          <router-link :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}">
            <span class="title">{{post.title}}</span>
          </router-link>
          
          <!-- 最后回复时间 -->
          <span class="last_reply">{{post.last_reply_at | formatDate}}</span>
        </li>
        <li>
          <Pagination @handleList="renderList"></Pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import Pagination from'./Pagination'

export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      posts: [],
      pageNum:1
    };
  },
  components:{
    Pagination
  },
  methods: {
    getData() {
      this.$http.get("https://cnodejs.org/api/v1/topics", {
          params: {
            limit: 20,
            page: this.pageNum
          }
        })
        .then(res => {
          this.isLoading = false;
          this.posts = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeStatus(e){
      console.log(e.currentTarget);
      this.$(e.currentTarget).addClass('active').siblings().removeClass('active')
    },
    renderList(value){
      this.pageNum = value
      this.getData()
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  }
};
</script>

<style scoped>
.PostList {
  background-color: #e1e1e1;
}
.posts {
  margin-top: 10px;
}

.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}

ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
  
}

ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;

}

li:not(:first-child):hover {
  background: #f5f5f5;
}

li:last-child:hover {
  background: white;
}

li span {
  height: 30px;
  line-height: 30px;
}

.title {
  display: inline-block;
  max-width: 650px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: top;
}

.allcount {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}

.reply_count {
  color: #9e78c0;
  font-size: 14px;
}

.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px 2px 7px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px 2px 7px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}

.toobar {
  height: 40px;
  background-color: #f5f5f5;
}

.toobar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 5px;
  cursor: pointer;
  padding: 5px;
}

.toobar span.active{
    background-color: #80bd01;
    color: white;
    border-radius: 5px;
  } 

  .toobar span:hover {
    color: #9e78c0;
  }

  .toobar span.active:hover {
    color: white;
  }


a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;

  padding-top: 10px;
}



@media screen and (max-width: 980px){
  .posts{
    margin: 10px 10px 10px;
  }
}
</style>


