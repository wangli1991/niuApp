/*
 * @Author: shenqz
 * @Date: 2020-04-29 12:50:26
 * @LastEditTime: 2020-04-29 12:50:39
 */
export default class Interceptors{
  constructor(){
    this._list=[];
  }

  use(fn){
    this._list.push(fn);
  }

  list(){
    return this._list;
  }
}
