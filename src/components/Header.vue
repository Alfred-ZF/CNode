<template>
  <div class="header">
    <div class="parent">
      <div class="container clearfix">
      <router-link :to="{name:'root'}">
        <img src="../assets/cnodejs_light.svg" alt>
      </router-link>
        <ul>
          <li>
            <a href="#">首页</a>
          </li>
          <li>
            <a href="#">新手入门</a>
          </li>
          <li>
            <a href="#">API</a>
          </li>
          <li>
            <a href="#">关于</a>
          </li>
          <li>
            <a href="#">注册</a>
          </li>
          <li>
            <a href="#">登录</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.header {
  height: 50px;
  background-color: rgb(68, 68, 68);
}
.header .parent {
  margin: 0 52px;
}
.header .parent .container {
  height: 50px;
  padding: 5px;
}

.header .parent .container img {
  max-width: 120px;
  margin-top: 3px;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

.header .parent .container ul {
  float: right;
  height: 50px;
  
  margin-top: -5px;
  margin-right: -35px;
}

.header .parent .container ul li {
  display: inline-block;
  height: 50px;
  padding: 0px 15px;
  margin:0 -5px;
}

.header .parent .container ul li a {
  display: inline-block;
  font-size: 13px;
  color: #ccc;
  height: 50px;
  line-height: 50px;
}


.header .parent .container ul li a:hover{
  color:white;
  font-weight: bold;
}
</style>
