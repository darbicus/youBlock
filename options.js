(function() {
    "use strict";
    var names = [];
    chrome.storage.sync.get("names", function(e) {
        console.log(e);
        names = e.names || [];
        console.log(names);
        updateNames();
    });

    function updateNames() {
        var namelist = document.getElementById('namelist');
        namelist.innerHTML = "";
        names.forEach(function(e) {
            var child = document.createElement('div');
            var db = document.createElement('span');
            db.setAttribute('class', "db");
            child.innerText = e;
            child.appendChild(db);
            namelist.appendChild(child);
            db.addEventListener('click', function() {
                namelist.removeChild(child);
                names.splice(names.indexOf(e),1);
                chrome.storage.sync.set({"names":names});
            });
        });
    }
    
    chrome.storage.onChanged.addListener(function(changes, area) {
        if (area === "sync") {
            names = changes.names.newValue;
            updateNames();
        }
    });
})();