/*
*  手机端布局 rem
*
*  相对HTML font-size
*/

(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;  //clientHeight
            // var clientHeight = docEl.clientHeight;
            //   console.log(2);
            if (clientWidth>720){
                clientWidth = 720;
            }

            docEl.style.fontSize = 100 * (clientWidth / 1000) + 'px';
            // var scale =  clientHeight/clientWidth;
            // if(scale<0.54){
            //     docEl.style.fontSize = 54 + 'px';
            // }else{
                
           // }
           // if(clientWidth>1000){clientWidth=1000}
           
        };
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

window.onload = function(){
  
}