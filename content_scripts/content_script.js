function me() {
  console.log(window.location.href);
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
  };
  //console.log();
  if (window.location.href === 'http://192.168.1.1/') {
    console.log('===0');
    co(function* () {
      // 加载脚本
      //yield scriptLoader({ src: '//cdn.bootcss.com/jquery/3.2.1/jquery.js' });
      //yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

      // 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
      ////////////////////////////////////////////////////////////////////////////////////////////////
      var shim =
        '(' +
        function () {
          console.log('inject=================');

          function personSpace() {
            var a = $('#space_0');
            a[0].click();
          }

          function showTodoNew() {
            //second_menu_content
            //var menuUL=$("#menuUL")
            var menus = $('.main_menu_a');
            // for (var menu in menus){
            //   console.log(menus[menu]);
            // }
            var m0 = $('.main_menu_a')[0];
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
            console.log('=======================================');
            //console.log(window[5]);
            var iframeMain = document.getElementById('main');
            var mainw = iframeMain.contentWindow;
            //console.log(window.main);
            //window.maw=mainw;
            var maindoc = iframeMain.contentWindow.document;
            console.log(maindoc);
            var normalDiv = maindoc.getElementById('normalDiv');
            var ma = $(normalDiv);

            //console.log(ma.find(".common_tabs"));
            var area5 = $(ma.find('.common_content_area')[5]);
            console.log(area5);
            var tab2 = $(area5.find('.color_black_nohover')[2]);
            tab2.trigger('click');
            setTimeout(function () {
              var rows = area5.find('.chessboardtable');
              console.log(rows);
              if (rows) {
                var a = $(rows[0]).find('a'); //.trigger("click");
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
          }

          function checkmenu() {
            var mi = $('.second_menu_item_name');
            if (mi.length > 0) console.log(mi);
            setTimeout(checkmenu, 1000);
          }

          function showmenu(i, j) {
            var menuitem = $.ctx.menu[i].items[j];
            var url = '/seeyon' + menuitem.url; //'/seeyon/portal/spaceController.do?method=showThemSpace&themType=19'
            showMenu(
              url,
              menuitem.id,
              2,
              menuitem.target,
              menuitem.name,
              menuitem.resourceCode,
              '-4751259066364441679'
            );
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
            $('#username').val('user');
            $('#password').val('dww3f');
            $('.buttonX')[0].click();
          }

          function chazhao() {
            console.log('chazhao========');
            var tofind = $('#mainput1').val();
            var iframes = $(main.document).find('select');
            $(iframes[0]).css('display', 'inline');
            $(iframes[0]).val('subject').trigger('change');
            //$(iframes[0]).css("display","none");
            //subject_container
            var iframes = $(main.document).find('#subject_container');
            iframes.removeClass('hidden');
            var iframes = $(main.document).find('.search_input');
            iframes.val(tofind);

            var iframes = $(main.document).find('.search_btn');
            iframes.trigger('click');
          }
          console.log($.ctx);
          console.log('insertBeast');
          //setTimeout(checkmenu, 1000);
          var beastImage = document.getElementById('madiv1');
          console.log(beastImage);
          if (!beastImage) {
            beastImage = document.createElement('div');
            beastImage.setAttribute('id', 'madiv1');
            beastImage.setAttribute('style', 'background:#aaaaaa'); // style="font-size:14px;width:600px;background-color:#FF0066
            var existingItem = document.body.firstElementChild;
            document.body.insertBefore(beastImage, existingItem);
          } else {
            beastImage.innerHTML = '';
          }
          // beastImage.setAttribute("style", "height: 100vh");
          var newe = document.createElement('button');
          beastImage.appendChild(newe);
          newe.insertAdjacentText('afterBegin', '登录');
          newe.onclick = login;


          var newe = document.createElement('input');
          beastImage.appendChild(newe);
          newe.setAttribute('id', 'mainput1');
          newe.setAttribute('value', 'erp');

          newe.onclick = yiban;
          var newe = document.createElement('button');
          beastImage.appendChild(newe);
          newe.insertAdjacentText('afterBegin', '查找');
          newe.onclick = chazhao;
        } +
        ')();';
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      scriptLoader({
        innerHTML: shim,
      }); //loader
    }); //co
  }
  //http://oa.ncschina.com/seeyon/collaboration/collaboration.do?method=updateContentPage
  else if (
    window.location.href.indexOf(
      'http://192.168.1.1/wlan_config.cgi'
    ) == 0
  ) {
    console.log('wlan_config.cgi');

    co(function* () {
      var shim =
        '(' +
        function () {
          function getAid() {
            var ws = window.location.href.split('&');
            var last = ws[ws.length - 1];
            var ss = last.split('=');
            var theid = ss[ss.length - 1];
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
          function getdata() {
            return($("#wepkey_show")[0].value);
          }
          function setdata(data) {
            $("#wepkey_show").val(data)
            // $("#Save_button")[0].click();
          }
          function toggle(){
            var d=getdata();
            console.log(d);
            if(d==="ipfrxxm3"){
              setdata("ipfrxxm369")
            }else{
              setdata("ipfrxxm3")
            }
          }
          setTimeout(getdata, 2000);
          if (window.showModalDialog == undefined) {
            window.showModalDialog = function (url) {
              window.open(url);
            };
            //addModal();
          }
          console.log(window);

          // console.log(window);
          // console.log(window.showModalDialog);
          var beastImage = document.getElementById('madiv1');
          //console.log(beastImage);
          if (!beastImage) {
            beastImage = document.createElement('div');
            beastImage.setAttribute('id', 'madiv1');
            beastImage.setAttribute('style', 'background:#AAAAAA'); // style="font-size:14px;width:600px;background-color:#FF0066
            var existingItem = document.body.firstElementChild;
            document.body.insertBefore(beastImage, existingItem);
          } else {
            beastImage.innerHTML = '';
          }
          var newe = document.createElement('button');
          beastImage.appendChild(newe);
          newe.insertAdjacentText('afterBegin', 'toggle');
          newe.onclick = toggle;

          var newe = document.createTextNode(window.location.href);
          beastImage.appendChild(newe);
        } +
        ')();';
      scriptLoader({
        innerHTML: shim,
      }); //loader
    }); //co
  } //else
}
me();
