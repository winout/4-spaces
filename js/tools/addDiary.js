chrome.extension.onRequest.addListener(function(req, sender,sendResponse){
  switch(req.method){
    case "getTxt":
      sendResponse({data: window.getSelection().toString()});
    break;
    
    case "putTxt":
      function add(){
        var txt = document.getElementById("textarea");    
        txt.value = req.data
        txt.focus();
      }
      if(!document.getElementById("textarea")){
        window.addEventListener("DOMContentLoaded", add);
      }else{
      add();
      }
    break;
  }
});