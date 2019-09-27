import jsonp from "@/common/jsonp";
import axios from "axios";
import {options,basic} from "./config";

//rank
export function apiRankList(){
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data= Object.assign({},basic,{
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    _: 1529054340584
  });
  return jsonp (url,data,options);
}

// rank Detail
export function apiRankList(topid){
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data=Object.assign({},basic,{
    topid,
    uin:0,
    platform: 'h5',
    needNewCode: 1,
    page: 'detail',
    type: 'top',
    tpl: 3
  })
  return jsonp(url,data,options)
}