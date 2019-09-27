import OriginJsonp from 'jsonp';
// 跨域url字段拼接
function params(url,data){
  let msg = '';
  for(let i in data){
    let value = data[i]=!undefined?data[i]:'';
    msg += "&"+i+"="+JSON.stringify(value);
  }
  // vkey接口的url 不能有引号
  let searchUrl = url.indexOf("mobile3")>0||url.indexOf('fcg_v8_toplist')>0;
  if(searchUrl){
    return msg.substring(1).replace(/["|"]/g,"")
  }else{
    return msg.substring(1);
  }
}
// 抛出二次封装的jsonp
export default function(url,data,option){
  url += url.indexOf("?")>0?"":"?"+params(url,data);
  return new Promise((resolve,reject)=>{
    OriginJsonp(url,option,(err,data)=>{
      if(!err){
        resolve(data);
      }else{
        console.log(err);
      }
    })
  })
}
