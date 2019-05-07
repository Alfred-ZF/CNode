<template>
  <div class="pagination">
    <button @click="changeBtns">首页</button>
    <button @click="changeBtns">前一页</button>
    <button class="pagebtn" v-if="judgeBtn">......</button>
    <button v-for="btn in pageBtns"
     :class="[{currentPage: btn == currentPage},'pagebtn']" 
     @click="changeBtns(btn)">
      {{btn}}
    </button>
    <button @click="changeBtns">后一页</button>
  </div>
</template>

<script>
// import $ from 'jquery'
  export default {
    name:'Pagination',
    data(){
      return{
        pageBtns:[1,2,3,4,5,'......'],
        currentPage:1,
        judgeBtn:false
      }
    },
    methods:{
      changeBtns(page){

        if (typeof page != 'number') {
          switch (page.target.innerText) {
            case '首页':
            console.log(1);
            
              this.pageBtns = [1,2,3,4,5,'......']
              this.changeBtns(1)
              break;
            case '前一页':
            console.log(this.$('button.currentPage'));
            
              this.$('button.currentPage').prev().click()
            break;
            case '后一页':
            console.log(3);
            console.log(this.$('button.currentPage'))
              this.$('button.currentPage').next().click()
            break;
          
            default:
              break;
          }
          return//至关重要的一个 return ！
        }

        if (page>4) {
          this.judgeBtn = true
        }else{
          this.judgeBtn = false
        }
        
        this.currentPage = page
        
        if (this.pageBtns[4] == page) {
          //去掉第一个数，在后面新添一个数
          this.pageBtns.splice(5,0,this.pageBtns[4]+1)
          this.pageBtns.shift()
        }else if (this.pageBtns[0] == page && this.pageBtns[0] !== 1) {
          //在前面新填一个数，把最后面的数去掉
          this.pageBtns.splice(0,0,this.pageBtns[0]-1)
          this.pageBtns.splice(5,1)
          
        }
        this.$emit('handleList',this.currentPage)
      }
    }
  }
</script>

<style scoped>
.pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;

    border: 1px solid #888888;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .currentPage {
    color: white;
    background-color: #1f1b1b;

  }
</style>