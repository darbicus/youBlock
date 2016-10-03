var names = [];
var listenForAllComments = function (e) {
	if(e.target.querySelector){
  var allcomments = e.target.querySelector('#all-comments');
  if (allcomments) {
    allcomments.addEventListener('DOMNodeInserted', function (e) {
      var flag = e.target.querySelector('button[data-action="flag"]'),
      author = e.target.querySelector('.author'),
      authortext = author ? author.textContent.trim() : '';
      if (flag && authortext) {
        flag.addEventListener('click', function (f) {
          names.push(authortext);
        });
      }
      if (authortext && names.some(function (f) {
          return f === authortext;
        })) {
        e.target.style.display = 'none';
      }
    });
    removeEventListener("DOMNodeInserted", listenForAllComments);
  }
	}
};
addEventListener('DOMNodeInserted', listenForAllComments);
