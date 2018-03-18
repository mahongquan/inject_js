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
  console.log(request.menu);
  browser.runtime.onMessage.removeListener(beastify);
}

/*
Remove every node under document.body
*/
function frm_unload(jsurl) {
  console.log("frm_unload");
  
}

/*
Given a URL to a beast image, create and style an IMG node pointing to
that image, then insert the node into the document.
*/
function frm_load(beastURL) {
  console.log("frm_load");
  console.log(beastURL);
  // var theScript = document.createElement('script');
  // console.log(theScript);
  // theScript.innerHTML = `console.log('hellow word !!');`;
  // console.log(theScript);
  // document.body.appendChild(theScript);
  //theScript.setAttribute("src", "moz-extension://187ee594-2967-4ce4-99c5-74fd2bffc268/beasts/inject.js");//jsurl);
  co(function *() {
    // 加载脚本
    yield scriptLoader({ src: beastURL });
    //yield scriptLoader({ src: '//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js' });

    // 检查jquery和jquery.cookie是否顺利注入。注意检查代码也要注入到页面环境
    // scriptLoader({
    //   innerHTML: `
    //   console.log("doinject.js inject=================");
    //     //console.log(window.jQuery.cookie);
    //   `,
    // });
  });
}
const scriptLoader = ({ src, innerHTML }) => {
  if (src) {
    return new Promise((resolve, reject) => {
      const theScript = document.createElement('script');
      theScript.src = src;
      theScript.onload = () => {
        resolve(theScript);
      };
      theScript.onerror = (err) => {
        console.log(err);
        console.log("load failed");
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


/*
Assign beastify() as a listener for messages from the extension.
*/
browser.runtime.onMessage.addListener(beastify);