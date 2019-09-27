<template>
  <div class="recommend-content">
    <div class="bsBox">
      <BScroll>
        <mt-swipe :auto="4000" class='slider'>
          <mt-swipe-item v-for="(item,index) in sliderData" :key='index'>
            <img :src="item.picUrl" width="100%" height="100%" alt="">
          </mt-swipe-item>
        </mt-swipe>
        <ul class="hotBox">
          <li class="hotItem" v-for="(item,index) in hotList" :key="index" @click="setListData(item)">
            <img :src="item.cover" width="100%" alt="">
            <div class="hot-msg">
              {{item.title}}
            </div>
          </li>
        </ul>
      </BScroll>
    </div>
  </div>
</template>

<script>
  import { mapGetters,mapMutations } from 'vuex';
  import {
    apiGetCarousle,
    apiGetHotSongList,
    apiGetSongList
  } from "../api/getViewData";
  export default{
    name:'commend',
    data(){
      return{
        sliderData:'',
        hotList:[],
        songListData:[],
        requestFlag:false
      }
    },
    methods:{
      ...mapMutations({
        setListData:'setListData'
      }),
      setListData(item){
        if(!this.requestFlag){
          this.requestFlag = true;
          apiGetSongList(item.content_id).then(res=>{
            console.log(res)
            if(res.code==0){
              console.log(res.code)
              let data = {
                showList: true,
                data:res.cdlist[0]
              };
              console.log(res.cdlist[0])
              this.requestFlag = false;
              this.$store.state.listData = data;
            }
          }).catch(e=>{
            this.requestFlag = false;
          })
        }
      }
    },
    computed:{
      ...mapGetters(['listData']),
    },
    created(){
      apiGetCarousle().then(res=>{
        if(res.code==0){
          this.sliderData =res.data.slider;
        }
      })
      apiGetHotSongList().then(res=>{
        if(res.code==0){
          this.hotList = res.recomPlaylist.data.v_hot;
          console.log(this.hotList)
        }
      })
    }
  }
</script>

<style lang="stylus">
  .recommend-content
    width: 100%;
    height: 100%;
    .bsBox
      height: 100%;
      overflow: hidden;
      // padding-bottom: 60px;
      .slider
        width: 100%;
        height: 40vw;
      .hotBox
        display:flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-top: 15px;
        .hotItem
          width: 28%;
          font-size:0;
          img
            border-radius: 10px;
          .hot-msg
            padding: 10px 0;
            line-height: 20px;
            font-size: 12px;
</style>
