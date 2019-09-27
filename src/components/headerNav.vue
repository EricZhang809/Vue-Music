<template>
  <div class="headerBox">
    <div class="navItem"
     :class="curIndex==index&&'active'"
     v-for="(item,index) in navData"
     @click="switching(index)"
     :key="index">{{item.name}}</div>
  </div>
</template>

<script>
  export default{
    name:'headerNav',
    data(){
      return{
        curIndex:0,
        navData:[{
          name:'推荐',
          path:'/index/commend'
        },{
          name:'排行榜',
          path:'/index/rank'
        },{
          name:'搜索',
          path:'/index/search'
        }]
      }
    },
    created(){
      this.navData.forEach((item,index)=>{
        if(item.path == this.$route.path){
          this.curIndex = index;
        }
      })
    },
    methods:{
      switching(index){
        this.curIndex = index;
        this.$router.push({
          path:this.navData[index].path
        })
      }
    }

  }
</script>

<style lang="stylus">
  .headerBox
    position: relative;
    display:flex;
    height:52px !important;
    line-height: 52px;
    text-align: center;
    .navItem
      width:100%;
      flex: 1;
      border-bottom: 2px solid transparent;
    .active
      color: #007AFF;
      border-bottom: 2px solid #007AFF;
</style>
