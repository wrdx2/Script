$.ajax({
	type:'post',
	url:BASE_URL+'servlet/ChatServlet',
	data:{},
	dataType:'json',
	success:function(data){
		if(data.result == true){
			reload();
		}
	}
});