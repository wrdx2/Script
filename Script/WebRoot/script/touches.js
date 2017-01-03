var touchCountElem = document.createElement("p");

function handleTouchEvent(event){
	var allTouches = event.touches,
		allTouchesLenght = allTouches.length;
	
	if(event.type === "touchstart"){
		event.preventDefault();
	}
	
	touchCountElem.innerHTML = "There are Currently " + allTouchesLenght + " touches on the screen.";
	
}

document.body.appendChild(touchCountElem);

window.addEventListener("touchstart",handleTouchEvent,false);
window.addEventListener("touchend",handleTouchEvent,false);