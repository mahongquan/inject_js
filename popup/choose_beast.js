/*
Given the name of a beast, get the URL to the corresponding image.
*/
function beastNameToURL(beastName) {
  switch (beastName) {
    case "Frog":
      return browser.extension.getURL("beasts/frog.jpg");
    case "Snake":
      return browser.extension.getURL("beasts/snake.jpg");
    case "Turtle":
      return browser.extension.getURL("beasts/turtle.jpg");
  }
}

/*
Listen for clicks in the popup.

If the click is on one of the beasts:
  Inject the "beastify.js" content script in the active tab.

  Then get the active tab and send "beastify.js" a message
  containing the URL to the chosen beast's image.

If it's on a button which contains class "clear":
  Reload the page.
  Close the popup. This is needed, as the content script malfunctions after page reloads.
*/

document.addEventListener("click", (e) => {
  console.log("addEventListener");
  console.log(e.target);
  //if (e.target.classList.contains("beast")) {
  console.log("beast");
  //var input1=document.getElementById("input1");
  var menutxt = e.target.textContent;
  if (menutxt == "login") {
     browser.tabs.executeScript(null, {
      file: "/content_scripts/jquery-3.3.1.js"
    });

    browser.tabs.executeScript(null, {
      file: "/content_scripts/login.js"
    });

    // var gettingActiveTab = browser.tabs.query({
    //   active: true,
    //   currentWindow: true
    // });
    // gettingActiveTab.then((tabs) => {
    //   browser.tabs.sendMessage(tabs[0].id, {
    //     menu: menutxt
    //   });
    // });
  } 
  else if (menutxt == "inject") {

    browser.tabs.executeScript(null, {
      file: "/content_scripts/doinject.js"
    });
    var gettingActiveTab = browser.tabs.query({
      active: true,
      currentWindow: true
    });
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        menu:browser.extension.getURL("me/inject.js")
      });
    });
  }
  else {
    //var chosenBeastURL = beastNameToURL(chosenBeast);
    browser.tabs.executeScript(null, {
      file: "/content_scripts/jquery-3.3.1.js"
    });

    browser.tabs.executeScript(null, {
      file: "/content_scripts/beastify.js"
    });

    var gettingActiveTab = browser.tabs.query({
      active: true,
      currentWindow: true
    });
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        menu: menutxt
      });
    });
  }
  // }
  //  else if (e.target.classList.contains("clear")) {
  //    browser.tabs.reload();
  //    window.close();
  //  }
});