<template>
  <div class="UserInfo">

    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt>
    </div>

    <div class="userInfomation" v-else>
      <section>
        <div class="user">
          <router-link :to="{name:'user_info',params:{name:userData.loginname}}">
            <img :src="userData.avatar_url">
            <span class="userName">{{userData.loginname}}</span>
          </router-link>
        </div>
        <p>积分：{{userData.score}}</p>
        <P>注册于：{{userData.create_at | formatDate}}</P>
      </section>

      <div class="replies">
        <P>最近回复的主题：</P>
        <ul>
          <li v-for="(reply,index) in userData.recent_replies">
            <router-link :to="{name:'post_content',params:{id:reply.id}}">
              {{index+1}}.{{reply.title}}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="topics">
        <p>创建的主题：</p>
        <ul>
          <li v-for="(reply,index) in userData.recent_topics">
            <router-link :to="{name:'post_content',params:{id:reply.id}}">
              {{index+1}}.{{reply.title}}
            </router-link>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      isLoading: false,
      userData: {}
    };
  },
  methods: {
    getUserInfoData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.isLoading = false;
          this.userData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getUserInfoData();
  }
};
</script>

<style scoped>
.userInfomation {
  background: white;
  width: 75%;
  margin: 10px auto;
}
.userInfomation section {
  padding: 15px;
}
.userInfomation section .user {
  margin-bottom: 10px;
  position: relative;
}
.userInfomation section .user .userName {
  /* display: inline-block; */
  position: absolute;
  left: 50px;
  
  top: 10px;
}
.userInfomation img {
  width: 40px;
}

.userInfomation p {
  padding-bottom: 10px;
}
.userInfomation li {
  list-style: none;
}
.userInfomation .replies,
.userInfomation .topics {
  font-size: 0.72rem;
  border-top: 10px #dddddd solid;
}
.userInfomation > div > p {
  padding: 12px 0 12px 12px;
  background-color: rgba(212, 205, 205, 0.17);
  font-size: 0.9rem;
  margin: 0;
}
.userInfomation > div > ul > li {
  padding: 4px 0 4px 12px;
  white-space: nowrap;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 30px;
  vertical-align: middle;
}
.userInfomation > div > ul > li > a {
  color: #094e99;
  text-decoration: none;
}

@media screen and (max-width: 980px){
  .userInfomation{
    margin: 10px 10px 10px;
  }
}
</style>