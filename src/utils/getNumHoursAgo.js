export let getNumHoursAgo = function(num) {
    // 获取当前时间
    // var _this = this;
    let yy = new Date().getFullYear();   //年
    let mm = new Date().getMonth() + 1   //月
    let dd = new Date().getDate()        //日
    let hh = new Date().getHours()-num    //时
    if(hh<=0){
      hh=hh+24
      dd=dd-1
      if(dd<=0){
        if(mm==1||mm==5||m==7||mm==8||mm==10||mm==12){
          dd=30
          mm--
          if(mm<=0){
            mm=12
            y--
          }
        }
        else if(mm==2||mm==4||mm==6||m==9||mm==11){
          dd=31
          mm--
          if(mm<=0){
            mm=12
            y--
          }
        }
        else if(mm==3 && yy%4==0 && yy%100!=0 || yy%400==0){
          dd=29
          mm--
          if(mm<=0){
            mm=12
            y--
          }
        }
        else if(mm==3 && yy%4!=0 && yy%100==0 || yy%400!=0){
          dd=28
          mm--
          if(mm<=0){
            mm=12
            y--
          }
        }
      }
    }
    mm = mm < 10 ? '0' + (mm - 0) : (mm - 0);
    dd = dd < 10 ? '0' + dd : dd;
    hh = hh < 10 ? '0' + (hh-0) : (hh-0);
    let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
    let gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
    //console.log(typeof mm)
    // console.log(_this.gettime)
    return gettime
  }