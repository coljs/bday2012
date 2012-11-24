
document.getElementsByTagName("body")[0].innerHTML += '<canvas id=sprite ></canvas>'; 

var items = document.getElementsByTagName("*");
var c = document.getElementById("sprite");
c.width = 3000;
c.height = 100000;
c.style.border = '1px solid black';

var y  = 0;
var x = 0;
var h = 0;
for (var i = items.length; i--;) {
	var bi = getComputedStyle(items[i]).backgroundImage;
	if(bi ){
		var str = bi
		str = str.replace("url(","");
		str = str.replace(")","");
		draw(str);
	}
}
function draw(source) {
	var ctx = document.getElementById('sprite').getContext('2d');
	var img = new Image();
	img.onload = function(){
		if(img.width > x){
			x = img.width;
		}		
		console.log(y);
		ctx.drawImage(img, 0, y, img.width, img.height);
		y = img.height + y;
		old = ctx.getImageData(0,0,x,y);
		//c.height = y;
		//ctx.getImageData(old,0,0);
	};
	img.src = source;
}

