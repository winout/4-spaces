ehsethsdrth
﻿
﻿
﻿
﻿
﻿
﻿
﻿
﻿chrome.extension.onRequest.addListener(function (req, sender,sendResponse){
	if(req.method == 'init'){
    chrome.extension.sendRequest({method: "getSet"}, function(r){
      localStorage.set = r.data;
    });
  }
});

chrome.extension.sendRequest({method: "getSet"}, function(r) {
  localStorage.set = r.data;
});

var
set = {},

ge = function(sel,met,tar){
  switch(met){
    case "tag":
      return (tar || document).getElementsByTagName(sel);
    break;
    case "class":
      return (tar || document).getElementsByClassName(sel);
    break;
    case "name":
      return document.getElementsByName(sel);
    break;
    case "css":
      return (tar || document).querySelector(sel);
    break;       
    case "cssAll":
      return (tar || document).querySelectorAll(sel);
    break;
    
    case "id":
    default:
      return document.getElementById(sel);
    break;    
  }
},

newAlert = function(vcontent, vtitle, callback){

var close = function()
{
  back.style.opacity = 0;
  setTimeout(function(){back.parentNode.removeChild(back);}, 100);
};

back = document.createElement("div");
back.style.cssText = "transition: opacity 100ms; opacity: 0; background-color: rgba(0, 0, 0, 0.84); width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; z-index: 99999;";

bodyalert = document.createElement("div");
bodyalert.style.cssText = "margin: 200px auto auto auto; width: 430px; box-shadow: 0px 0px 20px #000000;";

head = document.createElement("div");
head.className = "menu_wrap";
head.style.cssText = "padding: 4px;border: 1px solid; border-color: rgba(0, 0, 0, 0.5)";
title = document.createElement("span");
title.style.cssText = "font-size: 20px; font-weight: bold;color: rgba(255, 255, 255, 0.91); margin-left: 10px";
title.appendChild(document.createTextNode(vtitle || "Предупреждение"));
head.appendChild(title);
bodyalert.appendChild(head);


content = document.createElement("div");
content.className = "light_blue";
content.style.cssText = "border-left: 1px solid #999; border-right: 1px solid #999; padding: 16px 14px;";
content.appendChild(document.createTextNode(vcontent));
bodyalert.appendChild(content);

foot = document.createElement("div");
foot.style.cssText = "border-left: 1px solid #999; border-right: 1px solid #999; padding: 7px 7px; background-color: #BDBDBD; border-top: 1px solid #999; text-align: right;";

button_1 = document.createElement("input");
button_1.type = "submit";
button_1.style.cssText = "margin-top: 0; margin-right: 8px;"
button_1.className = "main_submit";
button_1.value = "OK";
button_1.addEventListener('click', close);
button_1.addEventListener('click', callback);
foot.appendChild(button_1);


button_2 = document.createElement("input");
button_2.type="submit";
button_2.style.cssText = "margin-top: 0;"
button_2.className = "main_submit";
button_2.value = "Close";
button_2.addEventListener('click', close);
foot.appendChild(button_2);


bodyalert.appendChild(foot);
back.appendChild(bodyalert);
document.body.appendChild(back);
setTimeout(function(){back.style.opacity = 1;}, 5);
},

insertCss = function(css, url){
  if(css){
    var cssEl = document.createElement("style");
    cssEl.setAttribute("type", "text/css");
    cssEl.innerHTML = css;
  }
  else if(url){
  var cssEl = document.createElement('link');
  cssEl.setAttribute('type', 'text/css');
  cssEl.setAttribute('rel', 'stylesheet');
  cssEl.setAttribute('href', url);
  }

  function setStyle(){
    if (cssEl){
      (document.head || document.documentElement).appendChild(cssEl);
    
    }else{
      init();
    }
  }

  function init(){
    if (!(document.documentElement instanceof HTMLElement)){
      return;
    }
    setStyle();   
  }

  if(document.documentElement){
    init();
  }else{
    window.setTimeout(init, 0);
  }
  return cssEl;
},

onlyUrl = function(reg, url){
  return reg.test(window.location[url || "href"]);
},
set = JSON.parse(localStorage.set);

if(set.enable = (!onlyUrl(/(?:i|f(?:c)?\d{0,2})\.spaces.ru/i, "hostname") && set.enable)){

  set.DnDupload = (set.DnDupload && (onlyUrl(/^\/files|video|music|pictures\//g, "pathname") && onlyUrl(/^\?r=main\/upload&/g, "search")));

  if(set.insertCss){
    var css = "";

    if(set.navi){
      if(set.navismall){
          css += "#navi{min-height:25px!important;border:1px solid #727272;padding:0!important}#navi table a{border:1px solid rgba(0,0,0,0)!important;padding:2px 0!important}.new_bg > #main_logo_link{padding:3px 3px 4px 10px !important}";
        }
        if(set.navifix){
          css += "#navi{position:fixed!important;z-index:12345;top:0;width:681px}#navi:hover{opacity:1!important}#navi+div{margin-top:"+((set.navismall) ? "35" : "48")+"px;}"; 
        
        }
        
        if(set.naviOldIcon){
          css += '#navi img.m{height:0!important;padding-left:25px!important;padding-top:25px!important;width:0!important;}.m[src$= "/profile_man_b.png"]{background:url(http://spaces.ru/i/qlt_man_b.png) no-repeat!important;}.m[src$="/profile_woman_b.png"]{background:url(http://spaces.ru/i/qlt_woman_b.png) no-repeat!important;}.m[src$="/qlt_homen_b.png"]{background:url(http://spaces.ru/i/qlt_home_b.png) no-repeat!important;}.m[src$="/qlt_journaln_b.png"]{background:url(http://spaces.ru/i/qlt_journal_b.png) no-repeat!important;}.m[src$="/qlt_lenta2n_b.png"]{background:url(http://spaces.ru/i/qlt_lenta_b.png) no-repeat!important;}.m[src$="/qlt_mailn_b.png"]{background:url(http://spaces.ru/i/qlt_mail_b.png) no-repeat!important;}'; 
        
        }       
    }
    
    if(set.hide){
      var hs = []; //hide selector
      if(set.reklam){
        hs.push("#reklama");
      }
      if(set.mobtop){
        hs.push("#mobtop", ".stnd_padd.vlight_border_bottom");
      }
      if(set.share){
        hs.push("#sharing_buttons", "small.grey");
      }
      if(set.copylink){
        hs.push("div#wrap_all>div.bottom_fix>div.t_center>small");
      } 
      if(set.mcblog && onlyUrl(/^\/mysite/g, "pathname")){
        hs.push("div[class='list_item blue_wrap_block overfl_hid']", "div[class='list_item gradient_block1 lh_160']");
        css += "#content_wrap_move>div.main>div.strong_border{border-bottom:none;}";
      }
      css += hs+"{display:none!important;}";   
    }
    
    if(set.add){
      if(set.watch){
        css += "#wrapper_for_header_fix span.right{display:none}.mywatch{-webkit-user-select:none;border:1px solid #4e574e;cursor:default;font-family:Arial,monospace;font-size:21px!important;opacity:0.7;padding:4px;position:fixed!important;right:0;text-align:center;top:0}.mywatch:hover{opacity: 1;}#navi:hover ~ .mywatch{display:none;}";
      }
    }
      
    if(set.redirect){
      css += "a.otherlink{border-bottom:1px solid #7000FF!important;color:#000!important;text-decoration:none!important}a.otherlink:hover{background:#cfcfcf !important;color:#000!important;text-decoration:none!important}";
    }
	
    if(set.DnDupload){
      css += ".paddd_btn{padding-bottom: 9px;}.paddd{padding: 0 9px;}.p_i_p_linesUSER {height: 6px!important;margin: 0px!important;margin-top: 5px!important;} .list_itemUSER{padding: 11px 0 0px 0!important;} .p_i_progress {padding 0px!important;margin: 8px 0 -11px 0;}";
    }
    
    if(onlyUrl(/^\/diary\//g, "pathname") && onlyUrl(/^\?r=diary\/(?:edit|new)&?/g, "search")){
      css += "#textarea{resize:vertical!important;overflow:visible!important;}";
    }
    insertCss(css, false);
    insertCss(false, chrome.extension.getURL("css/test.css"));
  }
  
 
  if(set.DnDupload){

    var
    
    format_bytes = function(a_bytes){
      if (a_bytes < 1024){
        return a_bytes+' B';
      }else if(a_bytes < 1048576){
        return(a_bytes / 1024).toFixed(2)+' KB';
      }else if(a_bytes < 1073741824){
        return(a_bytes / 1048576).toFixed(2)+' MB';
      }else if(a_bytes < 1099511627776){
        return(a_bytes / 1073741824).toFixed(2)+' GB';
      }
    },

    uploadProgress = function(e){
      var percent = parseInt(e.loaded / e.total * 100);
      dropZone.innerText = 'Загрузка: ' + percent + '%';
    },

    stateChange = function(e){
      if (e.target.readyState == 4) {
        if (e.target.status == 200) {
          dropZone.innerText = 'Загрузка успешно завершена!';
          windop=window.open();
          windop.document.open();
          windop.document.write(e.target.responseText);
          windop.document.close();
          File_id = /File_id=(\d+)&/i.exec(e.target.responseText)[1];
          prompt("Ссылка на файл","[url=http://spaces.ru/files/?r=main/view&Read="+File_id+"]Ссылка на файл[/url]");
        }else{
          dropZone.innerText = 'Произошла ошибка!';
          dropZone.className = 'error';
        }
      }
    },

    rand = function(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    dragOver = function(e){
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      dropZone.style.opacity = "1";
	  
      dropZone.innerHTML = "А теперь можно отпустить";
      return false;
    },

    dragLeave = function(){
      dropZone.style.opacity = "0.8";
      dropZone.innerHTML = "Тащи файлы сюда. ( или кликни )";
      return false;
    },
  	
    fileRead = function(e){
      e.preventDefault();
      dropZone.style.opacity = "0.8";
      dropZone.innerHTML = "Тащи файлы сюда. ( или кликни )";
      files = (e.dataTransfer && e.dataTransfer.files) || (e.target && e.target.files);
      
      var fragm = document.createDocumentFragment();

      for(var i=0, lst = []; file = files[i] ;i++){
        lst[i] = file;
        lst[i].fbsize = format_bytes(file.size);
        lst[i].format = formatp.exec(file.name) && formatp.exec(file.name)[1]; 
        lst[i].oname = namep.exec(file.name) && namep.exec(file.name)[1];;
        if (file.size >= maxFileSize){
          lst[i].error = 1;
        }
        var div = document.createElement("div");
        div.className="list_item list_itemUSER bookmark_block";
      
        if(lst[i].error==1){
          div.className += " error ";
        }
        var percent = (file.size * 100 / maxFileSize);
        div.innerHTML = "<div class='overfl_hid paddd'><span class='file_size right cross_pc'></span>Имя: "+lst[i].name+"; Размер: "+lst[i].fbsize+";</div>"+"<div class='p_i_progress overfl_hid' style='cursor: default;'><div class='p_i_p_lines_bg p_i_p_lines p_i_p_linesUSER' style='cursor: default;'></div><div class='p_i_p_loadLine p_i_p_lines p_i_p_linesUSER' style='cursor: default;width: "+percent+"%;'></div></div>";
      
        fragm.appendChild(div);
      };
      
      fUpLst.appendChild(fragm);
      
      filelist = filelist.concat(lst);
    },

    sender = function(){
      var z = filelist;
      for(i in z){
        send(sendurl, {"myFile": z[i], "dir": dir, "file_descr": "Имя: "+z[i].name+";**Размер: "+z[i].fbsize+";"});
      };
    },

    send = function(url, e){
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', uploadProgress, false);
      xhr.addEventListener('readystatechange', stateChange, false);
      xhr.open('POST', url);
      var fd = new FormData;
      for(i in e){
        fd.append(i, e[i]);
      }	
      xhr.send(fd);
    };
    
    const namep = /^([^\.$]+)/, formatp = /\.([^\.$]+)$/;
  }
}
