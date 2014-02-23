var links = document.getElementById("container").getElementsByTagName("a"),
tab = document.getElementById("tabs").getElementsByClassName("tab");

window.addEventListener('popstate', function(){
  var hash = location.hash.replace("#", "") || "main",
  reghash = new RegExp("(?:#|)" + hash + "$", "gi");

  for(i = 0, l = links.length;i < l; i++){
    links[i].parentNode.className = ((reghash.test(links[i].href)) ? "active" : "");
  }
  
  for(i = 0, l = tab.length;i < l; i++){
    tab[i].className = ((tab[i].id.indexOf(hash) >= 0) ? "active tab" : "tab");
  }
});