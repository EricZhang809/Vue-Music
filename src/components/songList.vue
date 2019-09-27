<template>
  <div class="songList">
    <mt-popup
      v-model="showList"
      position="right"
      pop-transition='popup-fade'>
      <div class="songList-contentBox"  v-if="$store.state.listData.data">
        <mt-header :title="$store.state.listData.data.dissname">
          <router-link :to="$route.path" slot="left">
            <mt-button icon="back" @click="setListData">返回</mt-button>
          </router-link>
        </mt-header>
        <div class="songList-content">
          <div class="songList-headerImg" :style="`background-image: url(${$store.state.listData.data.logo});`">
            <div class="blurBox"></div>
            <button @click="setCurSong($store.state.listData.data.songlist[0],0)"><i class="iconfont icon-arrow-"></i>播放全部</button>
          </div>
          <div class="songList-itemBox" v-if="$store.state.listData.data.songlist">
            <BScroll>
              <div class="songList-item" v-for="(item,index) in $store.state.listData.data.songlist" :key="index" @click="setCurSong(item,index)">
                <div class="songMsg">
                  <p class="songName">{{item.songname}}</p>
                  <p class="songSinger"><span v-for="(singer,singerIndex) in item.singer" :key="singerIndex">{{singer.name}}</span></p>
                </div>
              </div>
            </BScroll>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { mapGetters,mapMutations } from 'vuex';
  import { getVkey,apiGetLyric } from "../api/getViewData";
  export default{
    name:'songList',
    data(){
      return{
        showPlayer:false
      }
    },
    methods:{
      ...mapMutations({
        setListData:'setListData',
        setCurSong:'setCurSong',
        setCurIndex:'setCurIndex',
        setIsPlay:'setIsPlay'
      }),
      setListData(){
        this.$store.state.listData.showList = !this.$store.state.listData.showList;
      },
      setCurSong(songData,index){
        let songmid = songData.songmid;
        this.setCurIndex(index);
        getVkey(songmid,songmid).then(res=>{
          if(res.code==0){
            let data = {};
            data.showPlayer = true;
            data.data = songData;
            data.key = res.data.items;
            this.$store.state.curIndex = index;
            this.$store.state.curSong = data;
            this.setIsPlay(true);
            console.log(data);
            if(!data.key[0].vkey){
              MessageBox.alert('由于版权原因本歌曲暂时无法播放').then(action => {
              });
            }
          }
        })
      },
      setCurIndex(index){
        this.$store.state.curIndex = index;
        console.log(this.$store.state.curIndex);
      },
      setIsPlay(flag){
        this.$store.state.isPlay = flag;
      }
    },
    computed:{
      ...mapGetters(['listData','curSong','curIndex','isPlay']),
      showList:{
        get(){
          return this.$store.state.listData.showList;
        },
        set(newVal){
          return this.$store.state.listData.showList = newVal;
        }

      }
    }
  }
</script>

<style lang="stylus">
  .mint-popup
    width: 100%;
    height:100%;
    .songList-contentBox
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .songList-content
        display:flex;
        flex-direction: column;
        height: 100%;
        .songList-headerImg
          position: relative;
          height: 30vh;
          background-position: center;
          background-repeat: no-repeat;
          .blurBox
           width:100%;
           height: 100%;
           background:rgba(0,0,0,.5);
          button
            position: absolute;
            top: 60%;
            left: 50%;
            width: 40vw;
            height: 30px;
            margin-left: -20vw;
            background: rgba(38, 162, 255,.1)
            border: 2px solid #007AFF;
            color: #007AFF;
            border-radius: 25px;
            font-weight: 800;
            .iconfont
              margin: 0 10px;
        .songList-itemBox
          flex: 1;
          height: 100%;
          overflow: hidden;
          .songList-item
            box-sizing: border-box;
            height: 50px;
            font-size: 14px;
            padding: 0 10px;
            border-bottom: .5px solid rgba(100,100,100,.7);
            .songName
              width: 100%;
              height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 30px;
            .songSinger
              width: 100%;
              height: 20px;
              line-height: 20px;
              font-size: 10px;
              color:#1F1F1F;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              span
                display: inline-block;
                max-width: 60px;
                height: 20px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                margin-right: 10px;
</style>
