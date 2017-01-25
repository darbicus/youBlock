(function() {
  "use strict";
  var names = [];
  chrome.storage.sync.get("names", function(e) {
    console.log(e);
    names = e.names || [];
  });
  var listenForAllComments = function(e) {
    if (e.target.querySelector) {

      var frame = document.getElementById("live-chat-iframe").contentDocument,
        allcomments = frame.querySelector('#contents > yt-live-chat-renderer');
      var blockbutton = frame.querySelector('ytd-menu-service-item-renderer');

      if (allcomments) {
        allcomments.addEventListener('DOMNodeInserted', function(e) {
          if (e.target.nodeType === 3) {

            var author = e.target.parentElement.previousElementSibling.innerText,
              parent = e.target.parentElement.parentElement,
              menu = parent.nextElementSibling;
            //console.log(author,e.target.parentElement.innerText);
            menu.addEventListener('click', function(f) {
              //console.log(author);
              //console.dir(blockbutton);
              blockbutton = frame.querySelector('ytd-menu-service-item-renderer');
              if (blockbutton) {
                blockbutton.author = author;
              }
              var bbf = function(g) {
                console.log(blockbutton.author);
                if (!names.some(function(f) {
                    return f === blockbutton.author;
                  })) {
                  names.push(blockbutton.author);
                  chrome.storage.sync.set({
                    "names": names
                  });
                }

                blockbutton.removeEventListener('click', bbf);
              };
              blockbutton.addEventListener('click', bbf);

            });
            if (author && names.some(function(f) {
                return f === author;
              })) {
              console.log("blocked " + author);
              parent.parentElement.style.display = 'none';
            }
            //console.dir(e);
          }
        });
        removeEventListener("DOMNodeInserted", listenForAllComments);
      }
    }
  };
  addEventListener('DOMNodeInserted', listenForAllComments);
  chrome.storage.onChanged.addListener(function(changes, area) {
    if (area === "sync") {
      names = changes.names.newValue;
    }
  });
})();
