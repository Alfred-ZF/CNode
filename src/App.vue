<template>
  <div id="app">
    <Header/>
    <br>
    <div class="main">
      <router-view name="Slidebar"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import PostList from "./components/PostList";

export default {
  name: "App",
  components: {
    Header,
    PostList
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*::after {
  box-sizing: border-box;
}

*::before {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

body {
  background: #e1e1e1;
}

.main {
  width: 80%;
  margin: 0 auto;
}
</style>
