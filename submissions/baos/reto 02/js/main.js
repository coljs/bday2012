var
	width, height, len, pixels, tWidth, tHeight,

	r = 4,

	video = document.createElement('video'),

	canvas = document.createElement('canvas'),
	context = canvas.getContext('2d'),

	container = document.createElement('div')
;

video.autoplay = ' ';

function onUserMediaError(err) {}

function onUserMediaSuccess(stream) {
	var url = webkitURL.createObjectURL(stream);
	video.src = url;

	waitVideo(); //el fokiu loadedmetadata no funciona! 

}

function waitVideo() {
	if (video.currentTime > 0) {

		width = video.videoWidth;
		height = video.videoHeight;

		tWidth = width / r;
		tHeight = height / r;

		len = width * height * 4 / (r*2);

		canvas.width =tWidth;
		canvas.height = tHeight;

		container.style.width = tWidth + 'px';
		container.style.height = tHeight + 'px';
		
		dom(); // maldito mac tiene una imagen más grande
		draw();

	} else {
		setTimeout(waitVideo, 100);
	}
}

function draw() {
	webkitRequestAnimationFrame(draw);

	context.drawImage(video, 0, 0, tWidth, tHeight);
	pixels = context.getImageData(0, 0, tWidth, tHeight);

	for (var i=0; i < len; i += 4) {
		container.childNodes[i/4].style.backgroundColor = "rgb("+pixels.data[i]+","+pixels.data[i+1]+","+pixels.data[i+2]+")";
	}

	context.putImageData(pixels, 0, 0);

}

function getUserMedia() {
	navigator.webkitGetUserMedia({video:true}, onUserMediaSuccess, onUserMediaError);
}

function dom() {

	var i=0, l=len/4;

	for(; i<l; i++) {
		container.appendChild(document.createElement('i'));
	}

	document.body.appendChild(container);
}


function init() {
	getUserMedia();
}