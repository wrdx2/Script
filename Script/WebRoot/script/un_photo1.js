self.addEventListener("message",invertImage,false);

function invertImage(e){
	var message = e.data,
		imagePixels = message.data,
		x=0,
		len = imagePixels.length;
	
	for(;x<len;x+=4){
		imagePixels[x] = 255-imagePixels[x];
		imagePixels[x+1] = 255-imagePixels[x+1];
		imagePixels[x+2] = 255-imagePixels[x+2];
	}
	
	self.postMessage(message);
}