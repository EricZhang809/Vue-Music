<template>
   <div class="content">
     <HeaderNav></HeaderNav>
     <router-view/>
     <SongList></SongList>
     <songPlayer></songPlayer>
     <bottomPlayer v-if="$store.state.curSong.data"></bottomPlayer>
   </div>
</template>

<script>
  import HeaderNav from '@/components/headerNav';
  import bottomPlayer from '@/components/bottomPlayer';
  import SongList from '@/components/songList';
  import { mapGetters,mapMutations } from 'vuex';
  import { apiGetCarousle } from '../../api/getViewData';
  import songPlayer from '@/components/player'
  export default{
    name:'index',
    data(){
      return{
      }
    },
    components:{
      HeaderNav,
      bottomPlayer,
      SongList,
      songPlayer
    },
    methods:{
      ...mapMutations({
        setListData:'setListData'
      })
    },
    computed:{
      ...mapGetters(['listData','curIndex','curSong']),
      showList(){
        // return this.$store.state.listData.showList;
        return true;
      }
    }
  }
</script>

<style lang="stylus">
  .content
    min-width: 375px;
    display:flex;
    flex-direction: column;
    -moz-flex-directions: column;
    -ms-flex-directions: column;
    -o-flex-directions: column;
    -webkit-flex-directions: column;
    height: 100%;
</style>
