var set = JSON.parse(localStorage.set),

cs = JSON.parse(localStorage.cs),

elem = [],

ge = function(el){
  return document.getElementById(el);
},

crel = function(z){
  elem[z] = ge(z);
  elem[z].addEventListener("click", save);
},

save = function(){
  for(i in list){
    set[i] = ((elem[i].type == "checkbox") ? elem[i].checked : elem[i].value);
  }

  cs.enable = set.enable;
  
  set.checkenable = (set.enable && set.checkenable && (set.checkmes || set.checkjur || set.checkrss));

  localStorage.cs = JSON.stringify(cs);
  localStorage.set = JSON.stringify(set);
  chrome.extension.sendRequest({method: "init"});
  
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {method: "init"});
	});
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
    disoren(this, elem)
  });
  disoren(param, elem);
},

list = {"checkenable":"","enable":"","icon":""};

for(i in list){
  crel(i);
  elem[i].checked = set[i];
}


elem["enable"].addEventListener("change", updateIcon);
elem["icon"].addEventListener("change", updateIcon);

disorenUp(elem["enable"], [elem["icon"], elem["checkenable"]]);