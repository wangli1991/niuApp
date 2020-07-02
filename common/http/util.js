/*
 * @Author: shenqz
 * @Date: 2020-04-28 20:43:06
 * @LastEditTime: 2020-04-29 08:54:24
 */

//断言
export function assert(exp, msg='assert faild'){
  if(!exp){
    throw new Error(msg);
  }
};

//合并对象
export function merge(dest, src){
  for(let name in src){
    if(typeof src[name]=='object'){
      if(!dest[name]){
        dest[name]={};
      }

      merge(dest[name], src[name]);
    }else{
      if(src[name]!==undefined){
        dest[name]=src[name];
      }
    }
  }
};

//克隆对象
export function clone(obj){
  switch(typeof obj){
    case 'object':
      let obj2;
      if(obj instanceof Array){
        obj2=[];

        for(let i=0;i<obj.length;i++){
          obj2[i]=clone(obj[i]);
        }
      }else{
        obj2={};

        for(let key in obj){
          obj2[key]=clone(obj[key]);
        }
      }

      return obj2;
    // case 'function':
    //   return obj;
    default:
      return obj;
  }
};

//连接baseUrl, url
export function connectUrl(baseUrl, url) {
  if(baseUrl.endsWith('/')) {
    baseUrl = baseUrl.substr(0, baseUrl.length-1)
  }
  if (url.startsWith('/')) {
    url = url.substr(1)
  }
  return baseUrl ? `${baseUrl}/${url}` : url
}
