<template>
  <div class="rank">
    <BScroll>
      <div class="rank-content">
        <div class="rankList" v-for="(item,index) in rankList" :key="index" @click="setListData(item.id)">
          <img :src="item.picUrl" alt="">
          <div class="rankSongList">
            <div class="rankSongItem" v-for="(songItem,songIndex) in item.songList" :key='songIndex'>
              {{songItem.songname}}
            </div>
          </div>
        </div>
      </div>
    </BScroll>
  </div>
</template>

<script>
  import {getRankData,apiGetRankDetail} from '../api/getViewData';
  import { mapMutations,mapGetters } from 'vuex';
  export default{
    name:'rank',
    data(){
      return{
        rankList:[]
      }
    },
    created(){
      getRankData().then(res=>{
        if(res.code==0){
          this.rankList = res.data.topList;
          console.log(res)
        }
      })
    },
    computed:{
      ...mapGetters(['listData','curIndex','curSong']),
    },
    methods:{
      ...mapMutations({
        setListData:'setListData'
      }),
      setListData(topId){
        apiGetRankDetail(topId).then(res=>{
          if(res.code==0){
            let data = {
              data:{}
            };
            data.data.dissname = res.detail.data.data.AdShareContent;
            data.data.logo = res.detail.data.data.headPicUrl;
            data.data.songlist = res.detail.data.songInfoList;
            data.data.songlist.forEach((item,index)=>{
              item.songname = item.album.name;
              item.songmid = item.mid;
              item.albummid = item.album.mid;
              item.albumname = item.album.name;
            })
            data.showList = true;
            this.$store.state.listData = data;
            console.log(this.$store.state.listData)
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  .rank
    height: 100vh;
    overflow:hidden;
    .rank-content
      padding: 15px 7vw;
      .rankList
        display:flex;
        background:#f5f5f5;
        margin: 15px 0;
        img
          width: 30vw
          margin-right: 5vw;
        .rankSongList
          flex: 1;
          box-sizing: border-box;
          width: 100%;
          padding: 3vw 0;
          line-height: 8vw;
          overflow: hidden;
          font-size: 14px;
          .rankSongItem
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space:nowrap;
</style>
