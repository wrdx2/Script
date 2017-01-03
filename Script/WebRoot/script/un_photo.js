var canvas = document.createElement("canvas"),
	context = canvas.getContext("2d"),
	img = document.getElementById("image");

function processImage(){
	var imgWidth = img.width,
		imgHeight = img.height,
		
		workerThread = new Worker("script/text1.js");
	
	canvas.width = imgWidth;
	canvas.height = imgHeight;
	
	context.drawImage(img,0,0,imgWidth,imgHeight);
	
	workerThread.addEventListener("message",function(e){
		var imageData =e.data;
		
		context.putImageData(imageData,0,0);
	
		document.body.appendChild(canvas);
	},false);
	
	//document.body.appendChild(canvas);
	workerThread.postMessage(context.getImageData(0,0,imgWidth,imgHeight));
}

img.addEventListener("load",processImage,false);
