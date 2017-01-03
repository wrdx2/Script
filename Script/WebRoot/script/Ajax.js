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
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); // post ���α�����form���ʹ˾�
	xmlHttp.onreadystatechange = onReadyState;
	xmlHttp.send(null);
	window.setTimeout(firstRead, 500);
}

function sendMsg() {
	createXMLHttpRequest();
	xmlHttp.open("post", "servlet/ChatServlet", true);
	xmlHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded"); // post ���α�����form���ʹ˾�
	xmlHttp.onreadystatechange = onReadyState;
	var chatMsg = document.getElementById("chatInfo");
	xmlHttp.send("chatMsg=" + chatMsg.value);
	//document.getElementById("showChat").innerText = chatMsg;
	document.getElementById("chatInfo").value = "";// ����ı���
}

function onReadyState() { // onreadystatechange ÿ��״̬�ı䱻����

	if (xmlHttp.readyState == 4) {// ==4 �ͻ�����������������,,, ==200�Ƿ���ɹ�.,
		if (xmlHttp.status == 200) {
			//alert("����������: " + xmlHttp.responseText);//responseText ���ط���������
			document.getElementById("showChat").innerText = xmlHttp.responseText;
		}
	}
}

function getKeyCode() {
	if (event.keyCode == 13) {// �س���
		sendMsg();
	}
}