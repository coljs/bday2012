var video = document.querySelector('video');
var image = document.querySelector('img');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;

// Not showing vendor prefixes or code that works cross-browser.
navigator.webkitGetUserMedia({video: true}, function(stream) {
  video.src = window.webkitURL.createObjectURL(stream);
  localMediaStream = stream;
}, onError);

var colorToHex = function(color) {
  if (color.substr(0, 1) === '#') {
      return color;
  }
  var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

  var red = parseInt(digits[2]);
  var green = parseInt(digits[3]);
  var blue = parseInt(digits[4]);

  var rgb = blue | (green << 8) | (red << 16);
  return digits[1] + '#' + rgb.toString(16);
};

var onError = function(e) {
  console.log('Buuuhhhh!', e);
};

var processData = function(data){
  var r,g,b,a,pixel=null;
  pixel=0;
  var element = null;
  for(var i=0;i<data.length;i+=16){
    r=data[i];
    g=data[i+1];
    b=data[i+2];
    a=data[i+3];
    element = document.getElementById('elem'+pixel);
    element.style.width='1px';
    element.style.height='1px';
    element.style.background='#'+r.toString(16)+g.toString(16)+b.toString(16);
    element.style.float='inline-block';
    pixel++;
  }
    console.log(element);
};

var thread = function(){
  ctx.drawImage(video, 0, 0, 360, 240);
  var imageData = ctx.getImageData(0,0, 360, 240).data;
  processData(imageData);
  setTimeout(this.thread, 2000);
};


var container = document.createElement('div');
container.id = 'container';
for(var i=0;i<9000;i++){
    var element = document.createElement('div');
    element.id='elem'+i;
    container.appendChild(element);
}
container.style.width='300px';
container.style.height='300px';
document.body.appendChild(container);

thread();

