function me(){
console.log(window.location.href);
const scriptLoader = ({src, innerHTML}) => {
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
//console.log();
if(window.location.href.indexOf("http://oa.ncschina.com/seeyon/main.do")==0){
  co(function*() {
// 加载脚本
//yield scriptLoader({ src: '//cdn.bootcss.com/jquery/3.2.1/jquery.js' });
//yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

// 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
////////////////////////////////////////////////////////////////////////////////////////////////
var shim = '(' + function() {
  console.log("inject=================");

function personSpace() {
  var a = $('#space_0');
  a[0].click();
};

function showTodoNew() {
  //second_menu_content
  //var menuUL=$("#menuUL")
  var menus = $(".main_menu_a")
  // for (var menu in menus){
  //   console.log(menus[menu]);
  // }
  var m0 = $(".main_menu_a")[0];
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
  var mainw = iframeMain.contentWindow;
  //console.log(window.main);
  //window.maw=mainw;
  var maindoc = iframeMain.contentWindow.document;
  console.log(maindoc);
  var normalDiv = maindoc.getElementById("normalDiv");
  var ma = $(normalDiv)

  //console.log(ma.find(".common_tabs"));
  var area5 = $(ma.find(".common_content_area")[5]);
  console.log(area5);
  var tab2 = $(area5.find(".color_black_nohover")[2]);
  tab2.trigger("click");
  setTimeout(function() {
    var rows = area5.find(".chessboardtable");
    console.log(rows)
    if (rows) {
      var a = $(rows[0]).find("a"); //.trigger("click");
      //console.log(a);
      a[0].click();
      //var href=a.attr("href");//.split(":")[1]);
      //a.trigger("mouedown");
      // console.log(href);
      // console.log(window[5]);
      // console.log(window[5].openLink);
      // window[5].location.href = href;

    }
  }, 1000);

};

function checkmenu() {
  var mi = $(".second_menu_item_name")
  if (mi.length > 0)
    console.log(mi);
  setTimeout(checkmenu, 1000);
}

function showmenu(i, j) {

  var menuitem = $.ctx.menu[i].items[j];
  var url = '/seeyon' + menuitem.url; //'/seeyon/portal/spaceController.do?method=showThemSpace&themType=19'
  showMenu(url, menuitem.id, 2, menuitem.target, menuitem.name, menuitem.resourceCode, '-4751259066364441679')
}
function xinjian() {
  showmenu(0, 1);
}

function daiban() {
  showmenu(0, 4);
}

function yiban() {
  showmenu(0, 5);
}

function login() {
  $("#login_username").val("mahongquan");
  $("#login_password").val("mhq730208");
  $("#login_button")[0].click();
}

function chazhao() {
  console.log("chazhao========");
  var tofind = $("#mainput1").val();
  var iframes=$(main.document).find("select");
  $(iframes[0]).css("display","inline");
  $(iframes[0]).val("subject").trigger("change")
  //$(iframes[0]).css("display","none");
//subject_container
var iframes=$(main.document).find("#subject_container");
iframes.removeClass("hidden")
var iframes=$(main.document).find(".search_input");
iframes.val(tofind);

var iframes=$(main.document).find(".search_btn");
iframes.trigger("click");

  // var iframes=$(main.document).find("iframe");
  // $(iframes[0]).css("display","inline");
  

  // var contents=$(main.document).find(".common_drop_list_content");
  // $(contents[0]).css("display","inline");

  // var menus=$(contents[0]).find(".text_overflow");
  // console.log(menus);
  // $(menus[1]).trigger("click");  

  // var iframeMain = document.getElementById('main');
  // var mainw = iframeMain.contentWindow;
  // console.log(mainw);

  // var maindoc = iframeMain.contentWindow.document;
  // var ma = $(maindoc)
  // var input1=ma.find(".search_input");
  // console.log(input1);
  // $(input1).val("test");
  // //console.log(ma.find(".common_tabs"));
  // var condition = $(main.document).find(".common_drop_list_text")[0];
  // //$(condition).trigger("mouseenter");
  // console.log(condition);
}
console.log($.ctx);
console.log("insertBeast")
//setTimeout(checkmenu, 1000);
var beastImage = document.getElementById("madiv1");
console.log(beastImage);
if (!beastImage) {
  beastImage = document.createElement("div");
  beastImage.setAttribute("id", "madiv1");
  beastImage.setAttribute("style", "background:#aaaaaa"); // style="font-size:14px;width:600px;background-color:#FF0066
  var existingItem = document.body.firstElementChild;
  document.body.insertBefore(beastImage, existingItem);
} else {
  beastImage.innerHTML = "";
}
// beastImage.setAttribute("style", "height: 100vh");
var newe = document.createElement("button");
beastImage.appendChild(newe);
newe.insertAdjacentText("afterBegin", "登录");
newe.onclick = login;

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
newe.insertAdjacentText("afterBegin", "新建");
newe.onclick = xinjian;

var newe = document.createElement("button");
beastImage.appendChild(newe);
newe.insertAdjacentText("afterBegin", "待办");
newe.onclick = daiban;

var newe = document.createElement("button");
beastImage.appendChild(newe);
newe.insertAdjacentText("afterBegin", "已办");
newe.onclick = yiban;

var newe = document.createElement("input");
beastImage.appendChild(newe);
newe.setAttribute("id", "mainput1");
newe.setAttribute("value", "erp");

newe.onclick = yiban;
var newe = document.createElement("button");
beastImage.appendChild(newe);
newe.insertAdjacentText("afterBegin", "查找");
newe.onclick = chazhao;

//console.assert(window.jQuery, 'jQuery is not defined');
//console.log(window.jQuery);
//console.assert(window.jQuery.cookie, 'jQuery.cookie is not defined');
//console.log(window.jQuery.cookie);
} + ')();';
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  scriptLoader({
      innerHTML: shim
  });//loader 
});//co
}
//http://oa.ncschina.com/seeyon/collaboration/collaboration.do?method=updateContentPage
else if(window.location.href.indexOf("http://oa.ncschina.com/seeyon/collaboration/collaboration.do?method=updateContentPage")==0){
  console.log("updateContentPage,,,");
  //console.log(window.document.body.attributes["class"].indexOf("cke")>=0);
  //console.log(window.document.body.attributes["class"]);
  if (window.document.body.attributes["class"].value.indexOf("cke")>=0)
  {
    return
  }
  
  co(function*() {
// 加载脚本
//yield scriptLoader({ src: '//cdn.bootcss.com/jquery/3.2.1/jquery.js' });
//yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

// 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
var shim = '(' + function() {
  function getAid() {
  var ws=window.location.href.split("&");
  var last=ws[ws.length-1];
  var ss=last.split("=");
  var theid=ss[ss.length-1];
  console.log(theid);
}   
function changeEdit() {
  //var table=$("#exitDialog_a");
  //table.click();

  console.log(window);
  console.log(window.frameElement);
  //window.parentDialogObj["dialogUpdate"].close();
  // setTimeout(function(){
  //     var ext=$("#ok_msg_btn_first");
  //     console.log(ext);
  //     ext.trigger("click");
  // },2000);
}
function getdata(){
  if(window.CKEDITOR.currentInstance){
      window.currentInstance=window.CKEDITOR.currentInstance;
  }
  if(window.currentInstance){
       console.log(window.currentInstance.getData()); 
  }
  // var content = replaceAll($.content.getContent(), 'comp', '');
  // operationObj[0].componentDiv.$.content.setContent(content);
  // operationObj[0].setFlagto1();
  // window.parentDialogObj["dialogUpdate"].close();
  console.log(operationObj[0].componentDiv.$.content);
}
function setdata(){
  if(window.CKEDITOR.currentInstance){
      window.currentInstance=window.CKEDITOR.currentInstance;
  }
  if(window.currentInstance){
       window.currentInstance.setData("hello ");
  }
  
}
setTimeout(getdata,2000);
        if(window.showModalDialog == undefined){    
             window.showModalDialog = function(url){   
                 window.open(url);    
             }    
            //addModal();
        }   
        console.log(window);


// console.log(window);
// console.log(window.showModalDialog);
var beastImage = document.getElementById("madiv1");
//console.log(beastImage);
if (!beastImage) {
  beastImage = document.createElement("div");
  beastImage.setAttribute("id", "madiv1");
  beastImage.setAttribute("style", "background:#AAAAAA"); // style="font-size:14px;width:600px;background-color:#FF0066
  var existingItem = document.body.firstElementChild;
  document.body.insertBefore(beastImage, existingItem);
} else {
  beastImage.innerHTML = "";
}

var newe = document.createElement("button");
beastImage.appendChild(newe);
newe.insertAdjacentText("afterBegin", "修改正文");
newe.onclick = changeEdit;

var newe = document.createElement("button");
beastImage.appendChild(newe);
newe.insertAdjacentText("afterBegin", "getdata");
newe.onclick = getdata;

var newe = document.createElement("button");
beastImage.appendChild(newe);
newe.insertAdjacentText("afterBegin", "setdata");
newe.onclick = setdata;

var newe = document.createTextNode(window.location.href);
beastImage.appendChild(newe);

} + ')();';
scriptLoader({
    innerHTML: shim
});//loader
});//co

}//else

//http://oa.ncschina.com/seeyon/collaboration/collaboration.do?method=summary
else if(window.location.href.indexOf("http://oa.ncschina.com/seeyon/collaboration/collaboration.do?method=summary")==0){
  co(function*() {
// 加载脚本
//yield scriptLoader({ src: '//cdn.bootcss.com/jquery/3.2.1/jquery.js' });
//yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

// 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
 var shim = '(' + function() {
  function getAid() {
  var ws=window.location.href.split("&");
  var last=ws[ws.length-1];
  var ss=last.split("=");
  var theid=ss[ss.length-1];
  console.log(theid);
}  
console.log("summary"); 
console.log(getAid());
function downfujian() {
  var table=$("table");
  console.log(table);
  var rows=table.find("tr");
  for(var i=0;i<rows.length;i++){
     var row=rows[i];
     //console.log(row);
     // var subject=$(row).find("td")[1];
     
     // var span=$(subject).find("span");
     // if(span.length>0){
     //      if(span.attr("class").indexOf("affix_16")!=-1){
     //        console.log(subject.innerText);
     //      }
     // }
  }
}
var beastImage = document.getElementById("madiv1");
console.log(beastImage);
if (!beastImage) {
  beastImage = document.createElement("div");
  beastImage.setAttribute("id", "madiv1");
  beastImage.setAttribute("style", "background:#AAAAAA"); // style="font-size:14px;width:600px;background-color:#FF0066
  var existingItem = document.body.firstElementChild;
  document.body.insertBefore(beastImage, existingItem);
} else {
  beastImage.innerHTML = "";
}

var newe = document.createElement("button");
beastImage.appendChild(newe);
newe.insertAdjacentText("afterBegin", "下载附件");
newe.onclick = downfujian;

var newe = document.createTextNode(window.location.href);
beastImage.appendChild(newe);
} + ')();';
scriptLoader({
    innerHTML:"console.log('"+window.location.href+"');"+shim
});//loader
});//co

}//else

//method=listPending&_resourceCode=F01_listPending
else if(window.location.href.indexOf("http://oa.ncschina.com/seeyon/collaboration/collaboration.do?method=listPending")==0){
  co(function*() {
// 加载脚本
//yield scriptLoader({ src: '//cdn.bootcss.com/jquery/3.2.1/jquery.js' });
//yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

// 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
 var shim = '(' + function() {
  console.log("inject================")
function chazhao() {
  console.log("chazhao========");
  var tofind = $("#mainput1").val();
  var iframes=$(document).find("select");
  $(iframes[0]).css("display","inline");
  $(iframes[0]).val("subject").trigger("change")
  //$(iframes[0]).css("display","none");
  //subject_container
  var iframes=$(document).find("#subject_container");
  iframes.removeClass("hidden")
  var iframes=$(document).find(".search_input");
  iframes.val(tofind);

  var iframes=$(document).find(".search_btn");
  iframes.trigger("click");
}
function fujian() {
  var table=$("#listPending");
  //console.log(table);
  var rows=table.find("tr");
  for(var i=0;i<rows.length;i++){
     var row=rows[i];
     //console.log(row);
     var aid=$(row).find("td")[0];
     var theid=$(aid).find("input").val();
     var subject=$(row).find("td")[1];
     
     var span=$(subject).find("span");
     if(span.length>0){
          if(span.attr("class").indexOf("affix_16")!=-1){
            console.log(theid+" "+subject.innerText);
          }
     }
  }
}
var beastImage = document.getElementById("madiv1");
console.log(beastImage);
if (!beastImage) {
  beastImage = document.createElement("div");
  beastImage.setAttribute("id", "madiv1");
  beastImage.setAttribute("style", "background:#AAAAAA"); // style="font-size:14px;width:600px;background-color:#FF0066
  var existingItem = document.body.firstElementChild;
  document.body.insertBefore(beastImage, existingItem);
} else {
  beastImage.innerHTML = "";
}
var newe = document.createElement("input");
beastImage.appendChild(newe);
newe.setAttribute("id", "mainput1");
newe.setAttribute("value", "erp");


var newe = document.createElement("button");
beastImage.appendChild(newe);
newe.insertAdjacentText("afterBegin", "查找");
newe.onclick = chazhao;
var newe = document.createElement("button");
beastImage.appendChild(newe);
newe.insertAdjacentText("afterBegin", "附件");
newe.onclick = fujian;

var newe = document.createTextNode(window.location.href);
beastImage.appendChild(newe);
} + ')();';

scriptLoader({
    innerHTML: shim
});//loader
});//co

}//else
else if(window.location.href.indexOf("http://oa.ncschina.com/seeyon/index.jsp")==0){
  co(function*() {
    // 加载脚本
    //yield scriptLoader({ src: '//cdn.bootcss.com/jquery/3.2.1/jquery.js' });
    //yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

    // 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
    var shim = '(' + function() {
        console.log("inject================")
      function login() {
        $("#login_username").val("mahongquan");
        $("#login_password").val("mhq730208");
        $("#login_button")[0].click();
      }
      var beastImage = document.getElementById("madiv1");
      console.log(beastImage);
      if (!beastImage) {
        beastImage = document.createElement("div");
        beastImage.setAttribute("id", "madiv1");
        beastImage.setAttribute("style", "background:#AAAAAA"); // style="font-size:14px;width:600px;background-color:#FF0066
        var existingItem = document.body.firstElementChild;
        document.body.insertBefore(beastImage, existingItem);
      } else {
        beastImage.innerHTML = "";
      }

      var newe = document.createElement("button");
      beastImage.appendChild(newe);
      newe.insertAdjacentText("afterBegin", "登录");
      newe.onclick = login;

      var newe = document.createTextNode(window.location.href);
      beastImage.appendChild(newe);
    } + ')();';
    scriptLoader({
        innerHTML:shim
    });//loader
});//co

}//else
//http://oa.ncschina.com/seeyon/collaboration/collaboration.do?method=componentPage
else if(window.location.href.indexOf("http://oa.ncschina.com/seeyon/collaboration/collaboration.do?method=componentPage")==0){
  co(function*() {
    if(window.AjaxDataLoader){}
        else{return}
    // 加载脚本
    //yield scriptLoader({ src: '//cdn.bootcss.com/jquery/3.2.1/jquery.js' });
    //yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

    // 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
    var shim = '(' + function() {
      console.log("inject================")
      if(window.showModalDialog == undefined){    
            window.showModalDialog = function(url){   
                // if(window.hasOpenWindow){    
                //     alert("您已经打开了一个窗口！请先处理它");//避免多次点击会弹出多个窗口    
                //     window.myNewWindow.focus();    
                // }    
                //window.hasOpenWindow = true;    
                window.myNewWindow = window.open(url);    
            }    
      }   
      console.log(window.frameElement);
      function setbiaoti() {
        console.log("chazhao========");
        var tofind = $("#mainput1").val();
        
        var iframes=$(document).find("#subject");
        iframes.val(tofind);

      }
      var beastImage = document.getElementById("madiv1");
      console.log(beastImage);
      if (!beastImage) {
        beastImage = document.createElement("div");
        beastImage.setAttribute("id", "madiv1");
        beastImage.setAttribute("style", "background:#AAAAAA"); // style="font-size:14px;width:600px;background-color:#FF0066
        var existingItem = document.body.firstElementChild;
        document.body.insertBefore(beastImage, existingItem);
      } else {
        beastImage.innerHTML = "";
      }
      var newe = document.createElement("input");
      beastImage.appendChild(newe);
      newe.setAttribute("id", "mainput1");
      newe.setAttribute("value", "erp");


      var newe = document.createElement("button");
      beastImage.appendChild(newe);
      newe.insertAdjacentText("afterBegin", "标题");
      newe.onclick = setbiaoti;

      var newe = document.createTextNode(window.location.href);
      beastImage.appendChild(newe);
    } + ')();';
    scriptLoader({
        innerHTML:shim ,
    });//loader
});//co

}//else
else if(window.location.href.indexOf("http://oa.ncschina.com/seeyon/collaboration/collaboration.do?method=newColl")==0){
  co(function*() {
    if(window.AjaxDataLoader){}
        else{return}

    // 加载脚本
    //yield scriptLoader({ src: '//cdn.bootcss.com/jquery/3.2.1/jquery.js' });
    //yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

    // 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
    var shim = '(' + function() {
      console.log("inject================")
      if(window.showModalDialog == undefined){    
            window.showModalDialog = function(url){   
                // if(window.hasOpenWindow){    
                //     alert("您已经打开了一个窗口！请先处理它");//避免多次点击会弹出多个窗口    
                //     window.myNewWindow.focus();    
                // }    
                //window.hasOpenWindow = true;    
                window.myNewWindow = window.open(url);    
            }    
        }   
      function setbiaoti() {
        console.log("chazhao========");
        var tofind = $("#mainput1").val();
        
        var iframes=$(document).find("#subject");
        iframes.val(tofind);

      }
      var beastImage = document.getElementById("madiv1");
      console.log(beastImage);
      if (!beastImage) {
        beastImage = document.createElement("div");
        beastImage.setAttribute("id", "madiv1");
        beastImage.setAttribute("style", "background:#AAAAAA"); // style="font-size:14px;width:600px;background-color:#FF0066
        var existingItem = document.body.firstElementChild;
        document.body.insertBefore(beastImage, existingItem);
      } else {
        beastImage.innerHTML = "";
      }
      var newe = document.createElement("input");
      beastImage.appendChild(newe);
      newe.setAttribute("id", "mainput1");
      newe.setAttribute("value", "erp");


      var newe = document.createElement("button");
      beastImage.appendChild(newe);
      newe.insertAdjacentText("afterBegin", "标题");
      newe.onclick = setbiaoti;

      var newe = document.createTextNode(window.location.href);
      beastImage.appendChild(newe);
    } + ')();';
    scriptLoader({
        innerHTML:shim ,
    });//loader
});//co

}//else
//http://oa.ncschina.com/seeyon/fileUpload.do
else if(window.location.href.indexOf("http://oa.ncschina.com/seeyon/fileUpload.do")==0){
  co(function*() {
     console.log("else load");
    //  if(window.AjaxDataLoader){

    //  }
    //  else{
    //   return
    // }
    // 加载脚本
    //yield scriptLoader({ src: '//cdn.bootcss.com/jquery/3.2.1/jquery.js' });
    //yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

    // 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
    var shim = '(' + function() {
        console.log("inject================")
        function upload(){
          checks();
        }
        function formdata(){
          console.log("formdata");
          var data=new FormData($('#form_upload')[0]);
          console.log(data);
          //window.formdata=data;
          var vs=data.values();
          var nv=vs.next();
          while(!nv.done){
             console.log(nv);
             nv=vs.next();
          }
        }
        var beastImage = document.getElementById("madiv1");
        console.log(beastImage);
        if (!beastImage) {
          beastImage = document.createElement("div");
          beastImage.setAttribute("id", "madiv1");
          beastImage.setAttribute("style", "background:#AAAAAA"); // style="font-size:14px;width:600px;background-color:#FF0066
          var existingItem = document.body.firstElementChild;
          document.body.insertBefore(beastImage, existingItem);
        } else {
          beastImage.innerHTML = "";
        }
        var newe = document.createElement("button");
        beastImage.appendChild(newe);
        newe.insertAdjacentText("afterBegin", "upload");
        newe.onclick = upload;

        var newe = document.createElement("button");
        beastImage.appendChild(newe);
        newe.insertAdjacentText("afterBegin", "formdata");
        newe.onclick = formdata;

        var newe = document.createTextNode(window.location.href);
        beastImage.appendChild(newe);
    } + ')();';
    scriptLoader({
        innerHTML: shim
    });//loader
  });//co
}//else
else{
  //
  // co(function*() {
  //    console.log("else load");
  //   //  if(window.AjaxDataLoader){

  //   //  }
  //   //  else{
  //   //   return
  //   // }
  //   // 加载脚本
  //   //yield scriptLoader({ src: '//cdn.bootcss.com/jquery/3.2.1/jquery.js' });
  //   //yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

  //   // 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
  //   var shim = '(' + function() {
  //       console.log("inject================")
  //       var beastImage = document.getElementById("madiv1");
  //       console.log(beastImage);
  //       if (!beastImage) {
  //         beastImage = document.createElement("div");
  //         beastImage.setAttribute("id", "madiv1");
  //         beastImage.setAttribute("style", "background:#AAAAAA"); // style="font-size:14px;width:600px;background-color:#FF0066
  //         var existingItem = document.body.firstElementChild;
  //         document.body.insertBefore(beastImage, existingItem);
  //       } else {
  //         beastImage.innerHTML = "";
  //       }
  //       var newe = document.createTextNode(window.location.href);
  //       beastImage.appendChild(newe);
  //   } + ')();';
  //   scriptLoader({
  //       innerHTML: shim
  //   });//loader
  // });//co
}//else

}
me();