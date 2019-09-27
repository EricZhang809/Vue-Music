<template>
  <mt-popup
    v-model="$store.state.curSong.showPlayer"
    position="bottom" v-if="$store.state.curSong.data">
    <div class="player-box">
      <div class="playerTitle">
        <div class="back" @click="setCurSong({showPlayer:false})">
          <i class="iconfont icon-back"></i>
        </div>
        <div class="title-content">{{$store.state.curSong.data.songname}}</div>
      </div>
      <div class="player-img">
          <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${$store.state.curSong.data.albummid}.jpg`" alt="">
      </div>
      <div class="progress">
        <span class="starTime">{{currentTime}}</span>
        <div class="box" @mousemove="changeTime($event)" ref='box'>
          <div class="schedule" :style="progressWidth"></div>
          <span class="scheduleBtn" :style="progressBtn"></span>
        </div>
        <span class="endtime">{{endtTime}}</span>
      </div>
      <div class="player-button-content">
        <div class="player-button player-pattern" @click = 'changeStatus'>
          <span class="iconfont " :class="loopStatus[isLoop]"></span>
        </div>
        <div class="player-button">
          <span class="iconfont icon-previous" @click="prevSong"></span>
          <span class="iconfont" :class="$store.state.isPlay?'icon-zanting':'icon-arrow-'" @click="isPlaying"></span>
          <span class="iconfont icon-next" @click="nextSong"></span>
        </div>
      </div>
      <div class="player-bg" :style="`background-image:url('https://y.gtimg.cn/music/photo_new/T002R300x300M000${$store.state.curSong.data.albummid}.jpg')`"></div>
      <audio :src="songData"
      autoplay="true"
      :loop='isLoop==1?true:false'
      ref="player"
      v-if="$store.state.curSong.key[0].vkey"
      @timeupdate="upDataTime($event)"></audio>
    </div>
  </mt-popup>

</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { mapGetters,mapMutations } from 'vuex';
  import { getVkey } from "../api/getViewData";
  export default{
    name:'player',
    data(){
      return{
        rangeValue:0,
        currentTime:'00:00',
        endtTime:'00:00',
        isLoop:0,
        isPlayer:true,
        rotateDeg:0,
        loopStatus:['icon-icon','icon-danquxunhuan','icon-xunhuan','icon-suijibofang01']
      }
    },
    methods:{
      ...mapMutations({
        setListData:'setListData',
        setCurIndex:'setCurIndex',
        setCurSong:'setCurSong',
        setIsPlay:'setIsPlay'
      }),
      setIsPlay(flag){
        this.$store.state.isPlay = flag;
      },
      //设置当前歌曲数据，包括播放页面的显示隐藏
      setCurSong(json){
        let data = {};
        //请求当前歌曲的vkey
        if(json.songData){
          getVkey(json.songData.songmid,json.songData.songmid).then(res=>{
            // 重新设置当前的curSong
            if(res.code==0){
              data.showPlayer = true;
              data.data = json.songData;
              data.key = res.data.items;
              this.setIsPlay(true);
              this.$store.state.curSong = data;
              this.isCopyright();
            }
          })
        }else{
          data = this.$store.state.curSong;
          //设置当前歌曲播放
          data.isPlay = json.isPlay==true||json.isPlay==false?json.isPlay:true;
          //设置当前播放页的显示隐藏
          data.showPlayer = json.showPlayer==true||json.showPlayer==false?json.showPlayer:true;
          this.$store.state.curSong = data;
        }
      },
      // 修改索引
      setCurIndex(index){
        this.$store.state.curIndex = index;
        this.setCurSong({
          songData:this.$store.state.listData.data.songlist[this.currentIndex]
        })
      },
      //修改播放状态
      isPlaying(){
        this.setIsPlay(!this.$store.state.isPlay);
        console.log(this.$store.state.listData);
        this.playing();
      },
      // 改变进度条事件
      changeTime(ev){
        let offsetLeft =(ev.pageX-60)/this.$refs.box.offsetWidth;
        let end = this.$refs.player.duration;
        this.$refs.player.currentTime = offsetLeft*end;
        let cur = this.$refs.player.currentTime;
        let curSec = Math.floor(cur)%60;
        let curMin = Math.floor(Math.floor(cur)/60);
        let endSec = Math.floor(end)%60;
        let endMin = Math.floor(Math.floor(end)/60);
        curSec = curSec<10?'0'+curSec:curSec;
        curMin = curMin<10?'0'+curMin:curMin;
        endSec = endSec<10?'0'+endSec:endSec;
        endMin = endMin<10?'0'+endMin:endMin;
        this.rangeValue = offsetLeft *100;
        // 设置播放时间
        this.currentTime = curMin + ":" + curSec;
        this.endtTime = endMin + ":" + endSec;
        if(this.endtTime==this.currentTime){
          this.nextSong();
        }
      },
      // 执行播放
      playing(){
        if(this.$refs.player){
          this.$store.state.isPlay?this.$refs.player.play():this.$refs.player.pause();
        }
      },
      // 切换到上一首歌曲
      prevSong(){
        this.currentIndex = this.$store.state.curIndex;
        this.currentIndex--;
        this.currentIndex = this.currentIndex>0?this.currentIndex:0;
        this.setCurIndex(this.currentIndex)
      },
      // 切换到下一首歌曲
      nextSong(){
        this.currentIndex = this.$store.state.curIndex;
        if(this.isLoop==3){
          this.currentIndex = Math.floor(Math.random()*this.$store.state.listData.data.songlist.length)
        }else if(this.isLoop==2||this.isLoop==1){
          this.currentIndex++;
          
          this.currentIndex = this.currentIndex>this.$store.state.listData.data.songlist.length?0:this.currentIndex;
        }else if(this.isLoop==0){
          this.currentIndex++;
          this.currentIndex = this.currentIndex>this.$store.state.listData.data.songlist.length?this.$store.state.listData.data.songlist.length-1:this.currentIndex;
        }
        this.setCurIndex(this.currentIndex)
      },
      // 判断是否有版权
      isCopyright(){
        if(!this.$store.state.curSong.key[0].vkey){
          MessageBox.alert('由于版权原因本歌曲暂时无法播放').then(action => {
            this.nextSong();
          });
        }
      },
      // 改变循环状态
      changeStatus(){
        this.isLoop++;
        this.isLoop = this.isLoop%4;
        console.log(this.$store.state.curIndex,this.$store.state.listData)
      },
      // 播放事件监听
      upDataTime(ev){
        let cur = ev.srcElement.currentTime;
        let end = ev.srcElement.duration;
        let curSec = Math.floor(cur)%60;
        let curMin = Math.floor(Math.floor(cur)/60);
        let endSec = Math.floor(end)%60;
        let endMin = Math.floor(Math.floor(end)/60);
        curSec = curSec<10?'0'+curSec:curSec;
        curMin = curMin<10?'0'+curMin:curMin;
        endSec = endSec<10?'0'+endSec:endSec;
        endMin = endMin<10?'0'+endMin:endMin;
        this.rangeValue = cur/end *100;
        // 设置播放时间
        this.currentTime = curMin + ":" + curSec;
        this.endtTime = endMin + ":" + endSec;
        this.rotateDeg++;
        if(this.endtTime==this.currentTime&&this.isLoop!=1){
          this.nextSong();
        }else if(this.endtTime==this.currentTime&&this.isLoop==1){
          this.$refs.player.currentTime = 0;
        }
      }
    },
    computed:{
      ...mapGetters(['listData','curIndex','curSong','isPlay']),
      songData(){
        return `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/${this.$store.state.curSong.key[0].filename}?&vkey=${this.$store.state.curSong.key[0].vkey}&guid=5544337966&uin=0&fromtag=38`
      },
      progressWidth(){
        return `width:${this.rangeValue}%`
      },
      progressBtn(){
        return `left:${this.rangeValue}%`
      }
    },
    watch:{
      isPlay(old,newVal){
        this.playing();
      }
    }
  }
</script>

<style lang="stylus">
@import '../assets/font/iconfont.css';
.player-box
  position:relative;
  width: 100%;
  height: 100%;
  text-align: center;
  .player-bg
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(15px);
  .progress
  	display:flex;
  	width: 100%;
  	margin:30px 0 18px;
  	.starTime,.endtime
  		display:inline-block;
  		width: 25px;
  		margin:0 15px;
  		color:#fff;
  		font-size: 12px;
  		line-height: 5px;
  	.box
  		position:relative;
  		width: 100%;
  		height: 3px;
  		background: rgba(0,0,0,.5);
  		.schedule
  			width: 0%;
  			height: 100%;
  			background: #007AFF;
  		.scheduleBtn
  			position: absolute;
  			top: -8px;
  			left: 0;
  			width: 10px;
  			height: 10px;
  			border:5px solid #fff;
  			border-radius:50%;
  			background: #007AFF;
  .player-img
    padding: 60px 0 30px;
    .mint-swipe
      width: 100%;
      height: 90vw;
    img
      width: 70vw;
      border-radius: 50%;
      border:5px solid rgba(255,255,255,.5)
  .playerTitle
    display: flex;
    height:40px;
    line-height: 40px;
    background: rgba(0,0,0,.1);
    color:#fff;
    .back
      width: 50px;
    .title-content
      flex: 1;
      width: 100%;
      text-indent: -50px;
      font-weight: 800;
  .player-button-content
    position: absolute;
    bottom: 80px;
    left: 0;
    display:flex;
    width: 100%;
    color: #00C3F5;
    .player-button
      width: 100%;
      text-indent:-50px;
      .iconfont
        font-size: 40px;
        margin:0 20px;
    .player-pattern
      width: 100px;
      text-indent: 0;
</style>
