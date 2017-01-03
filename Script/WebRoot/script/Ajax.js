var xmlHttp;

function createXMLHttpRequest() {
	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}
}

function firstRead() {
	createXMLHttpRequest();
	xmlHttp.open("post", "servlet/ChatServlet", true);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); // post 传参必须有form表单和此句
	xmlHttp.onreadystatechange = onReadyState;
	xmlHttp.send(null);
	window.setTimeout(firstRead, 500);
}

function sendMsg() {
	createXMLHttpRequest();
	xmlHttp.open("post", "servlet/ChatServlet", true);
	xmlHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded"); // post 传参必须有form表单和此句
	xmlHttp.onreadystatechange = onReadyState;
	var chatMsg = document.getElementById("chatInfo");
	xmlHttp.send("chatMsg=" + chatMsg.value);
	//document.getElementById("showChat").innerText = chatMsg;
	document.getElementById("chatInfo").value = "";// 清空文本框
}

function onReadyState() { // onreadystatechange 每次状态改变被调用

	if (xmlHttp.readyState == 4) {// ==4 客户端与服务器交互完成,,, ==200是否传输成功.,
		if (xmlHttp.status == 200) {
			//alert("服务器返回: " + xmlHttp.responseText);//responseText 返回服务器数据
			document.getElementById("showChat").innerText = xmlHttp.responseText;
		}
	}
}

function getKeyCode() {
	if (event.keyCode == 13) {// 回车键
		sendMsg();
	}
}