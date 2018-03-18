const scriptLoader = ({ src, innerHTML }) => {
  if (src) {
    return new Promise((resolve, reject) => {
      const theScript = document.createElement('script');
      theScript.src = src;
      theScript.onload = () => {
        resolve(theScript);
      };
      theScript.onerror = () => {
        reject(`load ${src} failed`);
      };
      document.querySelector('*').appendChild(theScript);
    });
  }
  const theScript = document.createElement('script');
  theScript.innerHTML = innerHTML;
  document.body.appendChild(theScript);
  return theScript;
}

co(function *() {
  // 加载脚本
  //yield scriptLoader({ src: '//cdn.bootcss.com/jquery/3.2.1/jquery.js' });
  //yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

  // 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
  scriptLoader({
    innerHTML: `
    console.log("inject=================");
function personSpace() {
        var a = $('#space_0');
        a[0].click();
};
function  showTodoNew(){
  //second_menu_content
  //var menuUL=$("#menuUL")
  var menus=$(".main_menu_a")
  // for (var menu in menus){
  //   console.log(menus[menu]);
  // }
  var m0=$(".main_menu_a")[0];
  console.log(m0);
  m0.mouseenter();
  //console.log($(m0));//.trigger("mouseenter");
  //console.log($(".second_menu_item"));
  // for item in items:
  //   print(item.text)
  // items[1].click();#firefox
  // #items[4].find_element_by_tag_name("span").click()#phtomjs
  // #time.sleep(5)
}
function qingjia() {
  console.log("=======================================");
  //console.log(window[5]);
 var iframeMain = document.getElementById('main');
 var mainw=iframeMain.contentWindow;
 //console.log(window.main);
 //window.maw=mainw;
 var maindoc=iframeMain.contentWindow.document;
 console.log(maindoc);
 var normalDiv=maindoc.getElementById("normalDiv");
 var ma=$(normalDiv)
 
 //console.log(ma.find(".common_tabs"));
 var area5=$(ma.find(".common_content_area")[5]);
 console.log(area5);
 var tab2=$(area5.find(".color_black_nohover")[2]);
 tab2.trigger("click");
 setTimeout(function(){
   var rows=area5.find(".chessboardtable"); 
   console.log(rows)  
   if(rows){
        var a=$(rows[0]).find("a");//.trigger("click");
        //console.log(a);
        a[0].click();
        //var href=a.attr("href");//.split(":")[1]);
        //a.trigger("mouedown");
        // console.log(href);
        // console.log(window[5]);
        // console.log(window[5].openLink);
        // window[5].location.href = href;

   }
 },1000);
 
};
      
      console.log($.ctx);
      console.log("insertBeast")
      var beastImage = document.getElementById("madiv1");
      console.log(beastImage);
      if (!beastImage) {
        beastImage = document.createElement("div");
        beastImage.setAttribute("id", "madiv1");
        beastImage.setAttribute("style", "background:#66FF66");// style="font-size:14px;width:600px;background-color:#FF0066
        var existingItem = document.body.firstElementChild;
        document.body.insertBefore(beastImage, existingItem);
      }
      else{
        beastImage.innerHTML="" ;
      }
      // beastImage.setAttribute("style", "height: 100vh");
      var newe = document.createElement("button");
      beastImage.appendChild(newe);
      newe.insertAdjacentText("afterBegin", "请假单");
      newe.onclick = qingjia;
      var newe = document.createElement("button");
      beastImage.appendChild(newe);
      newe.insertAdjacentText("afterBegin", "个人");
      newe.onclick = personSpace;
      var newe = document.createElement("button");
      beastImage.appendChild(newe);
      newe.insertAdjacentText("afterBegin", "todo");
      newe.onclick = showTodoNew;
      //console.assert(window.jQuery, 'jQuery is not defined');
      //console.log(window.jQuery);
      //console.assert(window.jQuery.cookie, 'jQuery.cookie is not defined');
      //console.log(window.jQuery.cookie);
    `,
  });
});