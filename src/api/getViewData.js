import jsonp from '@/common/jsonp';
import axios from 'axios';
import { options, basic} from './config'
//获取轮播数据
export function apiGetCarousle(){
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({},basic,{
    platform:'h5',
    uin:0,
    needNewCode:1,
    _:1524035576554
  })
  return jsonp(url,data,options)
}

// 获取热门歌单
export function apiGetHotSongList(){
  const url="https://u.y.qq.com/cgi-bin/musicu.fcg";
  const data = Object.assign({},basic,{
    '-':'recom1744167483887',
    loginUin:0,
    hostUin:0,
    platform:'yqq.json',
    needNewCode:0,
    data:{
      "comm":{"ct":24},
      "recomPlaylist":{
        "method":"get_hot_recommend",
        "param":{"async":1,"cmd":2},
        "module":"playlist.HotRecommendServer",
      }
    }
  })
  return jsonp(url,data)
}

// 获取歌单详情页数据
export function apiGetSongList(disstid){
  const url="/api/getRecomDetailSongs";
  const data = {
    disstid,
    type:1,
    json:1,
    utf8:1,
    onlysong:0,
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    format:'json',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq',
    needNewCode:0
  }
  return axios.get(url,{
    params:data
  }).then(res=>{
    return Promise.resolve(res.data)
  })
}

// 获取vkey
export function getVkey(songmid,filename){
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  const data = Object.assign({},basic,{
    loginUin:0,
    hostUin:0,
    platform:'yqq',
    uin:0,
    needNewCode:0,
    cid:205361747,
    songmid,
    filename:`C400${filename}.m4a`,
    guid:5544337966
  });
  return jsonp(url,data)
}

// 获取排行榜数据
export function getRankData(){
  const url ='https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
  const data = Object.assign({},basic,{
		uin: 0,
		platform: 'h5',
		needNewCode: 1,
		_: 1529054340584
	})
  return jsonp(url,data,options)
}

// 获取榜单详细数据
export function apiGetRankDetail(topId){
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  const data = Object.assign({},basic,{
    loginUin: 0,
    hostUin: 0,
    platform:'yqq.json',
    needNewCode: 0,
    data: {
      "detail":{
        "module":"musicToplist.ToplistInfoServer",
        "method":"GetDetail",
        "param":{
          topId,
          "offset":0,
          "num":20,
        },
      }
    }
  })
  return jsonp(url,data)
}

//获取搜索热词
export function apiGetHotWords(){
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  const data = Object.assign({},basic,{
    _: 1568964262034,
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url,data,options)
}

// 搜索歌曲
export function apiGetKeyWords(key){
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg';
  let data = Object.assign({},basic,{
    is_xml:0,
    key,
    loginUin:0,
    hostUin:0,
    platform:'yqq.json',
    needNewCode:0
  })
  return jsonp(url,data,options);
}
//获取歌词
export function apiGetLyric(){
  const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?_=1569544321943`;
  const data = {
    "comm":{
      "g_tk":5381,
      "uin":0,
      "format":"json",
      "inCharset":"utf-8",
      "outCharset":"utf-8",
      "notice":0,
      "platform":"h5",
      "needNewCode":1,
    },
    "detail":{
      "module":"music.pf_song_detail_svr",
      "method":"get_song_detail",
      "param":{"song_id":239353091},
    }
  };
  return axios.get(url,{
    params:data
  }).then(res=>{
    return Promise.resolve(res.data)
  })
}
