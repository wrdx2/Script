var canvas = document.createElement("canvas"),
	context = canvas.getContext("2d");
var point[1][2]=null;

function handleTouchEvent(event){
	var imgWidth = body.width,
		imgHeight = body.height,
		
		workerThread = new Worker("script/text1.js");

	point[0][0]=clientX();
	point[0][1]=clientY();
	canvas.width = imgWidth;
	canvas.height = imgHeight;

	context.drawImage(img,0,0,imgWidth,imgHeight);

	workerThread.addEventListener("message",function(e){
	
		var imageData =e.data;
	
		context.putImageData(imageData,0,0);
		
		document.body.appendChild(canvas);
		},false);

	//document.body.appendChild(canvas);
	workerThread.postMessage(point);
	
}

document.body.appendChild(canvas);

window.addEventListener("click",handleTouchEvent,false);