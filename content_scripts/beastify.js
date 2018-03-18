/*
beastify():
* removes every node in the document.body,
* then inserts the chosen beast
* then removes itself as a listener
*/
function beastify(request, sender, sendResponse) {
  console.log(request.menu);
  //console.log(sender);
  //console.log(sendResponse);
  //removeEverything();
  if (request.menu === "Reset") {
    console.log("remove")
    frm_unload();
  } else {
    console.log("insert")
    frm_load(request.menu);
  }
  //console.log(request.menu);
  browser.runtime.onMessage.removeListener(beastify);
}

/*
Remove every node under document.body
*/
function frm_unload() {
  console.log("removeEverything");
  var beastImage = document.getElementById("madiv1");
  beastImage.remove();
}

/*
Given a URL to a beast image, create and style an IMG node pointing to
that image, then insert the node into the document.
*/
function frm_load(beastURL) {
  console.log("insertBeast")
  var beastImage = document.getElementById("madiv1");
  if (!beastImage) {
    beastImage = document.createElement("div");
    beastImage.setAttribute("id", "madiv1");
    beastImage.setAttribute("style", "background:#66FF66");// style="font-size:14px;width:600px;background-color:#FF0066
    var existingItem = document.body.firstElementChild;
    document.body.insertBefore(beastImage, existingItem);
  }
  else{
    beastImage.clear();
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
}
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
function personSpace() {
        var a = $('#space_0');
        a[0].click();
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
 
}

/*
Assign beastify() as a listener for messages from the extension.
*/
browser.runtime.onMessage.addListener(beastify);