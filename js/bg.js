chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
  switch(request.method){
    case "init":
      setLoad(); 
      chrome.windows.getAll({populate: true}, function(win){
        for (var i = 0; i < win.length; i++){
          for (var j = 0; j < win[i].tabs.length; j++){
            if((tab = win[i].tabs[j]) && (/spaces.ru/i.test(tab.url)) && (!/(?:i|f(?:c)?\d{0,2})\.spaces.ru/i.test(tab.url))){
              chrome.tabs.sendRequest(tab.id, {method: "init"});
            }
          }
        }
      });
    break;
    
    case "getSet":
      sendResponse({data: localStorage.cs});
    break;
    
    case "getLocalStorage":
      sendResponse({data: JSON.stringify(localStorage)});
    break;
    
    case "updateIcon":
      allTab();
    break;
  }
});

var SMS = {
  create: function(notID){
    timeout[notID] = setTimeout(function() {chrome.notifications.clear(notID, function() {notificationClosed(notID)})}, 20000);
  },

  click: function(notID) {
    var url;
    switch(notID){
      case "mes":
      url = "http://spaces.ru/mail/";
      break;
      case "jur":
      url = "http://spaces.ru/journal/";
      break;
      case "rss":
      url = "http://spaces.ru/lenta/";
      break;
    }

    chrome.tabs.create({ url: url}, function(){
      switch(notID) {
      case "mes":
        oldmes = 0;
      break;
      case "jur":
        oldjur = 0;
      break;
      case "rss":
        oldrss = 0;
      break;
      }
      chrome.notifications.clear(notID, function(){SMS.close(notID)});
    });
  },

  /*btnClick: function(notID, iBtn){
    if(notID == "mes"){
      switch(iBtn){
        case 0:
        alert("Прочитать");
        break;
        case 1:
        alert("Подождать");
        break;
      }
    }
  },*/

  show: function(evt, count){
    var IDD;
    var opt = {type: "basic", priority: 2, title: "SPACES.RU"};
    //opt.buttons = [];
    switch (evt){
      case 0:
        IDD = "mes";
        opt.message = "Принято "+count+" "+vidm(count, ' новое сообщение ', ' новых сообщения ', ' новых сообщений ');
        opt.iconUrl = "img/notife/mail.png";
        //opt.buttons.push({ title: "Прочитать" });
        //opt.buttons.push({ title: "Подождать" });
      break;
      case 1:
        IDD = "jur";
        opt.message = "У Вас "+count+" "+vidm(count, ' запись журнала ', ' записи журнала ', ' записей журнала ');
        opt.iconUrl = "img/notife/journal.png";
      break;
      case 2:
        IDD = "rss";
        opt.message = "У Вас "+count+" "+vidm(count, ' запись ленты ', ' записи ленты ', ' записей ленты ');
        opt.iconUrl = "img/notife/lenta.png"
      break;
    };
    if(set.checkaudio){
      audio.play();
    };
    chrome.notifications.create(IDD, opt, SMS.create);
  },
  
  close: function(notID){
    clearTimeout(timeout[notID]);
  }

};

chrome.notifications.onClosed.addListener(SMS.close);
chrome.notifications.onClicked.addListener(SMS.click);
//chrome.notifications.onButtonClicked.addListener(SMS.btnClick);

function headUpdate(){
  if(set.checkenable){
    var reg = /title="(?:Почта|Журнал|Лента)">\s+[^ПЖЛ]+[^\s]+(?:\s[^\s]+)?\s+(?:<span class="newevent(?:_imp)?">(\d{1,3})<\/span>|)\s+<\/a>\s+<\/td>/gm,
    xhr = new XMLHttpRequest();
    xhr.open('GET', "http://spaces.ru/complaints/?"+new Date().getTime()+";", false);
    xhr.send(null);
    var head = xhr.responseText,
    num = new Array(3);
    
    for(var i = 0;(h = reg.exec(head)) != null;i++){
      num[i] = parseInt(h[1], 10) || 0;
    }
    
    if((oldmes < num[0]) && set.checkmes){
      SMS.show(0, num[0]);
    }
    
    if((oldjur < num[1]) && set.checkjur){
      SMS.show(1, num[1]);
    }
    
    if((oldrss < num[2]) && set.checkrss){
      SMS.show(2, num[2]);
    }

    oldmes = num[0];
    oldjur = num[1];
    oldrss = num[2];
  }
  window.setTimeout(headUpdate, set.update_time);
}


setLoad();
allTab();
headUpdate();

function checkcontextmenus(){
  chrome.contextMenus.removeAll();

  function onClickHandler(info, tab){
    switch(info.menuItemId){
      case "HEAD":
        if(set.checkmes){
          SMS.show(0, 53);
        }
        if(set.checkjur){
          SMS.show(1, 42);
        }
        if(set.checkrss){
          SMS.show(2, 89); 
        }
      break;
      case "DIARY":
      chrome.tabs.executeScript(tab.id, {file: 'js/tools/addDiary.js', allFrames: false}, function(){
        chrome.tabs.sendRequest(tab.id, {method: "getTxt"}, function(r){
          var text = r.data;
          chrome.tabs.create({'url': 'http://spaces.ru/diary/?r=diary/new'}, function(tab){
            chrome.tabs.executeScript(tab.id, {file: 'js/tools/addDiary.js', allFrames: false}, function(){
              chrome.tabs.sendRequest(tab.id, {method: "putTxt", data: text});
            });
          });
        });
      });
      break;
    }
  }
  chrome.contextMenus.create({"title": "Проверка уведомлений", "id": "HEAD", "contexts":['page']});
  
  chrome.contextMenus.create({"title": "Создать дневник", "id": "DIARY", "contexts":['selection']});
  chrome.contextMenus.onClicked.addListener(onClickHandler);
}

checkcontextmenus();


/*
    windop = window.open();
    windop.document.open();
    windop.document.write("<textarea>"+head+"</taxtarea>");
    windop.document.close();
*/
