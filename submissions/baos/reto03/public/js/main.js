/************************************
 * The Javascript prototype and 
 * window extension
 ************************************/

window.$ = function (){
    return document.getElementById.apply(document, arguments);
};
window.$$ = function (){
    return document.querySelectorAll.apply(document, arguments);
};
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
    list = $('list'),
    voted = false,
    audio = $('song_player'),
    most_voted = 0,
    most_voted_id = '';


/******************************
* Events listeners emits socketio
*******************************/
if(list !== null ){

    list.addEventListener('click', function(event) {

        if((event.target.tagName == 'P' || event.target.tagName == 'I') && voted === false) {
            socket.emit('vote',event.target.parentNode.getAttribute('id'));
            var el = $(event.target.parentNode.getAttribute('id'));
            el.querySelector('i').addClassName('selected');
            //voted = true;
        }else{
            //alert('you all ready vote, try when the current song finished');
        }
    });
}


/******************************
* Socket.io on
*******************************/

socket.on('connected',function(obj){
    for(var key in obj){
        console.log(key+' '+obj[key]);
       $(key).querySelector('p span').innerHTML=obj[key];
    }
});

socket.on('setvote', function(obj){
    var id = obj.id,
        votes = obj.votes,
        el = $(id);
    el.querySelector('p span').innerHTML=votes;
});

socket.on('update_song',function(url){
    console.log(url);
    if(audio !== null){
        console.log('lalala');
        change_song(url);
    }
});

socket.on('reset',function(){
    $$('#list_player li').forEach(function(el){
       el.querySelector('p span').innerHTML=0;
    });
});

/******************************
* songs change
*******************************/
function change_song(src_song){
    audio.src = src_song;
}

if(audio !== null){
    audio.addEventListener('ended', function(){
        $$('#list_player li').forEach(function(el){
            if(most_voted < el.querySelector('p span').textContent){
                most_voted = el.querySelector('p span').textContent;
                most_voted_id = el.getAttribute('id');
            }
        });
        socket.emit('finish_votations', most_voted_id);
    });
}
/******************************
* sort ul
*******************************/

function sortList(listId){
    var oUl = document.getElementById(listId);
    for(var i in oUl.childNodes){
        var x = oUl.childNodes[i];
        for(var j in oUl.childNodes){
            var y = oUl.childNodes[j];
            // if((x.innerText != 'undefined' || y.innerText != 'undefined')  && x.innerText>y.innerText){
            //     // Skip if x is already the first list item
            //       if(oUl.firstChild!=x)
            //           oUl.insertBefore(y,x);
            //   }
          }
      }
          
  }

// sortList('list');