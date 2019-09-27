<template>
  <div class="bottom-player">
    <div class="bottom-song-msg" @click="setCurSong">
      <div class="songImg">
        <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${$store.state.curSong.data.albummid}.jpg`"  alt="">
      </div>
      <div class="bottom-player-msg">
        <p>{{$store.state.curSong.data.songname}}</p>
        <p>{{$store.state.curSong.data.singer[0].name}}</p>
      </div>
    </div>
    <div class="iconfontBox">
      <i class="iconfont " :class="$store.state.isPlay?'icon-zanting':'icon-arrow-'" @click="setIsPlay(!$store.state.isPlay)"></i>
    </div>
  </div>
</template>

<script>
  import { mapGetters,mapMutations } from 'vuex';
  export default{
    name:'bottomPlayer',
    methods:{
      ...mapMutations({
        setCurSong:'setCurSong',
        setIsPlay:'setIsPlay'
      }),
      setIsPlay(flag){
        console.log(this.$store.state.listData)
        this.$store.state.isPlay = flag;
      },
      setCurSong(){
        this.$store.state.curSong.showPlayer = true;
      }
    },
    computed:{
      ...mapGetters(['curSong','isPlay',"listData"])
    }
  }
</script>

<style lang="stylus">
  .bottom-player
    position:fixed;
    box-sizing: border-box;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: 60px;
    background: #007AFF;
    padding: 0 10px;
    opacity: .7;
    color:#fff;
    .bottom-song-msg
      display:flex;
    .songImg
      height: 60px;
      img
        height: 48px;
        margin:6px;
    .iconfontBox
      width: 40px;
      text-align: center;
      margin-right: 10px;
      .iconfont
        line-height: 60px;
        font-size:40px;
    .bottom-player-msg
      height: 40px;
      font-size: 14px;
      line-height: 20px;
      padding: 10px 0;
</style>
