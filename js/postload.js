if(set.enable){

  if(set.add && set.watch){
    
    watch = document.createElement("div");
    watch.setAttribute("class", "mywatch menu_wrap newevent");
    document.body.appendChild(watch);
      
    var db = " ",
    
    vt = function(i){
      return i < 10 ? "0"+i : i;
    },
     
    timeon = function(){
      var tm = new Date(),
      h = vt(tm.getHours()),
      m = vt(tm.getMinutes());
      
      db = (db == " " ? ":" : " ");
      watch.innerHTML = h+db+m;
      /*s = vt(tm.getSeconds())*/
    };
      
    timeon();
    setInterval(timeon,500);
  };

  if(set.navi && set.navifix){
    var opna = set.opna, navi = ge("navi"), parr = navi.parentNode, navih;
    function heitwith(){
      navih = navi.offsetHeight;
      navi.style.width = parr.clientWidth+"px";
    }
    heitwith();
    window.addEventListener("resize", heitwith);
    if(opna < 1){
      window.addEventListener("scroll", function(){
        navi.style.opacity = (window.scrollY > navih) ? opna : "1";
      });
    }
  };

  if(set.redirect){
    var lnk = document.links;
    for(i in lnk){
      if(/&redirect=/i.test(lnk[i].href)){
        var url = lnk[i].href.split("redirect=")[1];
        lnk[i].setAttribute("href", "http://spaces.ru/?xyz=1&redirect="+url);
        lnk[i].setAttribute("title", decodeURIComponent(url));
        lnk[i].setAttribute("target", "_blank");
        lnk[i].setAttribute("class", "otherlink");
      }
    }
  };

  if(set.coin){
    if((reklama = ge("reklama","id")) && (link = ge("a","tag",reklama))){
      for (i in link){
        if(/coins.png/i.test(lnk[i].outerHTML)){
          location.href = lnk[i].href;
          break;
        }
      }
    }
  };
  
  if(set.DnDupload){
  
    for(f = document.forms, i = 0;z = f[i];i++){
      if(z.action.indexOf("upload") >= 0){
        z.parentNode.style.display = "none";
        forma = z;
        sendurl = z.action;
        dir = ge("dir","name")[0].value;
        break;
      }
    }
    
    

    maina = ge('main',"class")[0];

    newform = document.createElement("div");
    newform.className = 'strong_border paddd_btn';
    newform.innerHTML = '<label><div id="dropZone" class="footer_PC p_i_p_progressLine" style="cursor: pointer;width: 100%;opacity: 0.8;-webkit-transition: all 200ms ease-in-out;"> Тащи файлы сюда. ( или кликни ) </div><input type="file" id="files" name="myFile" style = "display:none" multiple /></label><div id = "fileuploadlist" style="-webkit-transition: all 200ms ease-in-out;"></div><input type="submit" id="sender" value="На Сибирь!!!" style="margin: 8px 0 0 9px;" class="main_submit">';
    newform = maina.insertBefore(newform, maina.firstChild);

    var
    dropZone = ge("dropZone"),
    input = ge("files"),
    sendbutton = ge("sender"),
    fUpLst = ge("fileuploadlist"),

    maxFileSize = 31457280, //30 MB

    filelist = [];
  
    dropZone.addEventListener('dragover', dragOver, false);
    dropZone.addEventListener('dragleave', dragLeave, false);
    
    dropZone.addEventListener('drop', fileRead, false);
    input.addEventListener('change', fileRead, false);

    sendbutton.addEventListener('click', sender, false);
  }

};


//alert(window.location.pathname);

/*
e.preventDefault();
*/