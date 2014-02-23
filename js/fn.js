if(localStorage.set == undefined){
  chrome.tabs.create({ url: chrome.extension.getURL("options.html#info")});
}

var oldmes = 0, oldjur = 0, oldrss = 0, timeout = [], set = {},

tabChecker = function(tab) {
  if (!tab){
    return;
  }
  
  if((/spaces.ru/i.test(tab.url)) && (!/(?:i|f(?:c)?\d{0,2})\.spaces.ru/i.test(tab.url))){ 
    var iconFile = set.enable ? "img/enable.png" : "img/disable.png";
    
    chrome.pageAction.setIcon({
      tabId: tab.id,
      path: iconFile
    });

    chrome.pageAction.setTitle({
      tabId: tab.id,
      title: "4Spaces.ru"
    });
    if (set.icon){
      chrome.pageAction.show(tab.id);
    }else{
      chrome.pageAction.hide(tab.id);
    }
  }
},

allTab = function(){
  chrome.windows.getAll({
    populate: true
  }, function(windows){
    for (var i = 0; i < windows.length; i++)
      for (var j = 0; j < windows[i].tabs.length; j++)
        tabChecker(windows[i].tabs[j]);
  });
},

setLoad = function(){
  set = JSON.parse(localStorage.bg);
  audio.setAttribute("src", "/audio/"+set.notaudio+".mp3");
},

vidm = function(num, _1, _2, _5){
  num += "";
  var l = num.length;
  var m=num.charAt(l-2);
  var n=num.charAt(l-1);
  mn = parseInt(m+n, 10);
  l = parseInt(n, 10);
  if((4 < mn) && (mn < 21)){
    return _5;
  }else if((l > 5) || (l == 0)){
    return _5;
  }else if(l == 1){
    return _1;
  }else if(l < 5){
    return _2;
  }
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.status == "loading"){
    tabChecker(tab);
  }
});

audio = new Audio('1.mp3');
audio.setAttribute("type", "audio/mp3");
audio.setAttribute("preload", "true");