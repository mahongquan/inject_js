console.log("inject=================");
// function personSpace() {
//         var a = $('#space_0');
//         a[0].click();
// };
// function  showTodoNew(){
//   //second_menu_content
//   //var menuUL=$("#menuUL")
//   var menus=$(".main_menu_a")
//   // for (var menu in menus){
//   //   console.log(menus[menu]);
//   // }
//   var m0=$(".main_menu_a")[0];
//   console.log(m0);
//   m0.mouseenter();
//   //console.log($(m0));//.trigger("mouseenter");
//   //console.log($(".second_menu_item"));
//   // for item in items:
//   //   print(item.text)
//   // items[1].click();#firefox
//   // #items[4].find_element_by_tag_name("span").click()#phtomjs
//   // #time.sleep(5)
// }
// function qingjia() {
//   console.log("=======================================");
//   //console.log(window[5]);
//    var iframeMain = document.getElementById('main');
//    var mainw=iframeMain.contentWindow;
//    //console.log(window.main);
//    //window.maw=mainw;
//    var maindoc=iframeMain.contentWindow.document;
//    console.log(maindoc);
//    var normalDiv=maindoc.getElementById("normalDiv");
//    var ma=$(normalDiv)
   
//    //console.log(ma.find(".common_tabs"));
//    var area5=$(ma.find(".common_content_area")[5]);
//    console.log(area5);
//    var tab2=$(area5.find(".color_black_nohover")[2]);
//    tab2.trigger("click");
//    setTimeout(function(){
//      var rows=area5.find(".chessboardtable"); 
//      console.log(rows)  
//      if(rows){
//         var a=$(rows[0]).find("a");//.trigger("click");
//         //console.log(a);
//         a[0].click();
//         //var href=a.attr("href");//.split(":")[1]);
//         //a.trigger("mouedown");
//         // console.log(href);
//         // console.log(window[5]);
//         // console.log(window[5].openLink);
//         // window[5].location.href = href;

//    }
//  },1000);
 
// };
// function checkmenu(){
//   var mi=$(".second_menu_item_name")
//   if (mi.length>0)
//     console.log(mi);
//   setTimeout(checkmenu,1000);
// }
// function showmenu(i,j){

//   var menuitem=$.ctx.menu[i].items[j];
//   var url='/seeyon'+menuitem.url;//'/seeyon/portal/spaceController.do?method=showThemSpace&themType=19'
//   showMenu(url,menuitem.id,2,menuitem.target,menuitem.name,menuitem.resourceCode,'-4751259066364441679')
// }      
// function daiban(){
//   showmenu(0,4);
// }
// function yiban(){
//   showmenu(0,5);
// }
// function login(){
//   $("#login_username").val("mahongquan");
//   $("#login_password").val("mhq730208");
//   $("#login_button")[0].click();
// }
// function chazhao(){
//   console.log("chazhao");
//   var tofind=$("#mainput1").val();
//    var iframeMain = document.getElementById('main');
//    var mainw=iframeMain.contentWindow;
//    console.log(mainw);
  
//    var maindoc=iframeMain.contentWindow.document;
//    var ma=$(maindoc)
   
//    //console.log(ma.find(".common_tabs"));
//    var area5=$(ma.find(".common_drop_list_text"));
//    console.log(area5);
// }
//       console.log($.ctx);
//       console.log("insertBeast")
//       //setTimeout(checkmenu,1000);
//       var beastImage = document.getElementById("inject_madiv1");
//       console.log(beastImage);
//       if (!beastImage) {
//         beastImage = document.createElement("div");
//         beastImage.setAttribute("id", "inject_madiv1");
//         beastImage.setAttribute("style", "background:#66FF66");// style="font-size:14px;width:600px;background-color:#FF0066
//         var existingItem = document.body.firstElementChild;
//         document.body.insertBefore(beastImage, existingItem);
//       }
//       else{
//         beastImage.innerHTML="" ;
//       }
//       // beastImage.setAttribute("style", "height: 100vh");
//       var newe = document.createElement("button");
//       beastImage.appendChild(newe);
//       newe.insertAdjacentText("afterBegin", "登录");
//       newe.onclick = login;

//       var newe = document.createElement("button");
//       beastImage.appendChild(newe);
//       newe.insertAdjacentText("afterBegin", "请假单");
//       newe.onclick = qingjia;

//       var newe = document.createElement("button");
//       beastImage.appendChild(newe);
//       newe.insertAdjacentText("afterBegin", "个人");
//       newe.onclick = personSpace;


//        var newe = document.createElement("button");
//       beastImage.appendChild(newe);
//       newe.insertAdjacentText("afterBegin", "待办");
//       newe.onclick = daiban;

//       var newe = document.createElement("button");
//       beastImage.appendChild(newe);
//       newe.insertAdjacentText("afterBegin", "已办");
//       newe.onclick = yiban;

//       var newe = document.createElement("input");
//       beastImage.appendChild(newe);
//       newe.setAttribute("id", "mainput1");
//       newe.onclick = yiban;
//       var newe = document.createElement("button");
//       beastImage.appendChild(newe);
//       newe.insertAdjacentText("afterBegin", "查找");
//       newe.onclick = chazhao;
