<template>
  <div class="search">
    <div class="searchBox">
      <div class="searchBox-content">
        <div class="iconfont-Box"><i class="iconfont icon-search"></i></div>
        <input type="text" 
        v-model="searchWords" 
        placeholder="搜索歌曲、歌单、专辑" 
        @blur="getIsBlur" 
        @focus="searchMusic" 
        @keydown="getKeyWords"
        @keydown.enter="getIsBlur">
        <div class="exit" v-show="isBlur" @click="exit">取消</div>
      </div>
    </div>
    <div class="keyWords" v-show="!this.isBlur">
      <div class="hot">
        <div class="hotWordsTitle">
          搜索热词
        </div>
        <div class="hotWords" v-if="hotWords">
          <span class="special">{{hotWords.special_key}}</span>
          <span v-for="index in 8" :key="index">{{hotWords.hotkey[Math.floor(Math.random()*hotWords.hotkey.length)].k}}</span>
        </div>
      </div>
      <div class="searchHistory">
        <div class="searchHistoryTitle">
          搜索历史
        </div>
        <div class="historyKeyWords">
          <span v-for="(item,index) in searchHistory" :key='index'>{{item}}</span>
        </div>
      </div>
    </div>
    <div class="searchList" v-show="this.isBlur" v-if="searchData.song">
      <div v-for="(item,index) in searchData.song.itemlist" :key='index'>
        <span class="songName">{{item.name}}</span>
        <span class="singer">{{item.singer}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { apiGetHotWords,apiGetKeyWords } from '../api/getViewData'
  export default{
    name:'search',
    data() {
      return {
        isBlur:false,
        searchWords:'',
        hotWords:'',
        searchHistory:[],
        searchData:[]
      }
    },
    created(){
      apiGetHotWords().then(res=>{
       this.hotWords = res.data;
       console.log(this.hotWords);
      })
    },
    methods:{
      searchMusic(){
        this.isBlur = true;
      },
      exit(){
        this.isBlur = false;
        this.searchWords = '';
      },
      getKeyWords(){
        apiGetKeyWords(this.searchWords).then(res=>{
          this.searchData = res.data;
          console.log(res);
        })
      },
      getIsBlur(){
        this.isBlur = this.searchWords?true:false;
        if(this.searchWords){
          console.log(this.searchHistory);
          this.searchHistory.indexOf(this.searchWords)==-1?this.searchHistory.push(this.searchWords):'';
        }
      }
    }
  }
</script>

<style lang="stylus">
  .search
    height: 100vh;
    overflow: hidden;
    .searchBox
      box-sizing: border-box;
      padding: 10px;
      background:#f4f4f4;
      .searchBox-content
        display:flex;
        background:#fff;
        overflow: hidden;
        border-radius: 5px;
        .iconfont-Box
          width: 40px;
          text-align: center;
          line-height: 34px;
          .iconfont
            font-size: 24px;
            color: #ccc;
        input
          flex: 1;
          width:100%;
          height 34px;
          font-size: 14px;
        .exit
          width: 40px;
          text-align: center;
          font-size: 14px;
          line-height: 34px;
          background: #f4f4f4;
    .keyWords
      padding: 0 10px;
      .hotWordsTitle,.searchHistoryTitle
        font-size: 16px;
        height: 30px;
        line-height: 30px;
      .special
        color: #F15353;
        border-color: #F15353;
      span
        display: inline-block;
        font-size: 12px;
        height: 12px;
        line-height: 12px;
        padding: 5px 8px;
        margin: 5px;
        border: 1px solid #ccc;
        border-radius: 11px;
</style>
