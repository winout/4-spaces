if(localStorage.set == undefined){
  localStorage.set = '{"add":true,"checkaudio":true,"checkenable":true,"checkjur":true,"checkmes":true,"checkrss":true,"coin":true,"copylink":true,"enable":true,"hide":true,"icon":true,"mcblog":true,"mobtop":true,"navi":true,"navifix":true,"navismall":true,"notaudio":"5","opna":"60","redirect":true,"reklam":true,"share":true,"update_time":5000,"watch":true,"foropna":"60","DnDupload":false,"naviOldIcon":true}';
}

var elem = [],

ge = function(el){
  return (typeof el == 'string' || typeof el == 'number') ? document.getElementById(el) : el;
},

geByTag = function(tag, node){
  return (node || document).getElementsByTagName(tag);
},

crel = function(z){
  elem[z] = ge(z);
  elem[z].addEventListener("click", save);
},

save = function(){
  for(i in set){
    set[i] = ((elem[i].type == "checkbox") ? elem[i].checked : elem[i].value);
  }
  set.update_time = parseInt(set.update_time, 10);
  
  var bg = {
    enable: set.enable,
    icon: set.icon,

    checkenable: set.checkenable,
    
    checkmes: set.checkmes,
    checkjur: set.checkjur,
    checkrss: set.checkrss,
    
    checkaudio: set.checkaudio,
    
    notaudio: set.notaudio,
    
    update_time: +set.update_time
  },
  
  cs = {
    enable: set.enable,

    navi: (set.navi && (set.navismall || set.navifix)),
    navismall: set.navismall,
    navifix: set.navifix,
    opna: parseInt(set.opna, 10)/100,
    naviOldIcon: set.naviOldIcon,

    hide: (set.hide && (set.reklam || set.mobtop || set.share || set.copylink)),
    lefttab: set.lefttab,
    reklam: set.reklam,
    mobtop: set.mobtop,
    share: set.share,
    copylink: set.copylink,
    mcblog: set.mcblog,

    add: (set.add && (set.watch)),
    watch: set.watch,

    redirect: set.redirect,
    coin: set.coin,
    
    DnDupload: set.DnDupload
  };

  cs.insertCss = (cs.navi || cs.hide || cs.add || cs.redirect);

  set.checkenable = (set.enable && set.checkenable && (set.checkmes || set.checkjur || set.checkrss));

  localStorage.cs = JSON.stringify(cs);
  localStorage.bg = JSON.stringify(bg);
  
  localStorage.set = JSON.stringify(set);
  chrome.extension.sendRequest({method: "init"});
},

updateIcon = function(){
  chrome.extension.sendRequest({method: "updateIcon"});
},

disorenUp = function(param, elem){
  function disoren(param, elem){
    for(i = 0,h = !param.checked, l = elem.length;i < l; i++){
      elem[i].disabled = h;
    }
  }
  param.addEventListener("change", function(){
    disoren(this, elem);
  });
  disoren(param, elem);
};


var set = JSON.parse(localStorage.set);

for(i in set){
  crel(i);
  elem[i].type == "checkbox" ? elem[i].checked = set[i] : elem[i].value = set[i];
}

crel("foropna");
crel("play");
notifesound = new Audio();

elem["foropna"].value = opna.value;
elem["opna"].addEventListener('change',function(){
  foropna.value = opna.value;
});
elem["foropna"].addEventListener('change',function(){
  opna.value = foropna.value;
});

elem["enable"].addEventListener("change", updateIcon);
elem["icon"].addEventListener("change", updateIcon);


soundmng = function(){
  notifesound.src = "audio/"+notaudio.value+".mp3";
};

soundmng();

elem["notaudio"].addEventListener("change", function(){
  soundmng();
  notifesound.play();
});

elem["play"].addEventListener("click",function(){
  notifesound.play();
});


disorenUp(elem["checkaudio"], [elem["notaudio"]]);

disorenUp(elem["checkenable"], [elem["checkmes"], elem["checkjur"], elem["checkrss"], elem["update_time"], elem["checkaudio"], elem["notaudio"]]);
disorenUp(elem["navi"], [elem["navismall"], elem["navifix"], elem["foropna"], elem["opna"], elem["naviOldIcon"]]);
disorenUp(elem["navifix"], [elem["opna"], elem["foropna"]]);
disorenUp(elem["hide"], [elem["reklam"], elem["mobtop"], elem["share"], elem["copylink"], elem["mcblog"]]);
disorenUp(elem["add"], [elem["watch"]]);
save();