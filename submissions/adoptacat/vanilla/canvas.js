javascript: var manager = (function(){
  var imagenes = "";
  var a = document.createElement('canvas');
  var b = a.getContext("2d");
  var x = 0;
  var height = 0;

  a.setAttribute("height", "4000px");
  a.setAttribute("width", "4000px");
  document.body.appendChild(a);
  
  return {
     appendImage: function(imagen){
       var newUrl = new RegExp(imagen.src);
       console.log(imagenes);
       if(!newUrl.test(imagenes)){
         imagenes += imagen.src;
         b.drawImage(imagen, x, 0, imagen.width, imagen.height);
         x = x + imagen.width;         
       }
     }
  };
})();

var es = document.querySelectorAll("*");
for(var i=0; i < es.length; i++){
  es[i].onclick=function(e){
    var a = e.srcElement;
    var s = document.defaultView.getComputedStyle(a,null).getPropertyValue("background");
    var src = /url\((.*)\)/.exec(s);
    if(src.length>1){
      var imagen = new Image;
      imagen.src = src[1];
      manager.appendImage(imagen);
    }
  };
}

