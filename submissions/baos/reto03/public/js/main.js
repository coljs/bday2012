/************************************
 * The Javascript prototype and 
 * window extension
 ************************************/

window.$ = function (){
    return document.getElementById.apply(document, arguments)
}
window.$$ = function (){
    return document.querySelectorAll.apply(document, arguments)
}
NodeList.prototype.forEach = function(){
    return Array.prototype.forEach.apply(this, arguments);
};

Element.prototype.hasClassName = function(name) {
  return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
};
Element.prototype.addClassName = function(name) {
  if (!this.hasClassName(name)) {
    this.className = this.className ? [this.className, name].join(' ') : name;
  }
};
Element.prototype.removeClassName = function(name) {
  if (this.hasClassName(name)) {
    var c = this.className;
    this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
  }
};
/******************************
* Global variable
*******************************/

var socket = io.connect(),
	vote = $$('.vote');
	sendNick = $('sendNick'),
	nick = $('nick'),
	text = $('message'),
	area = $('messages'),
  nicknames = $('nicknames'),
  textList = '';

/******************************
* Events listeners emits socketio
*******************************/


    document.getElementById('list').addEventListener('click', function(event) {
        if(event.target.tagName == 'LI') {

          socket.emit('vote',event.target.getAttribute('id'));
        }
    });

/******************************
* Socket.io on 
*******************************/

socket.on('setvote', function(obj){
  var id = obj.id,
      votes = obj.votes;
  $(id).querySelector('p span').innerHTML=votes;
});


/******************************
* songs change
*******************************/
function change_song(){

  
}

video.onended = function(){
  socket.emit('get_song');
};

