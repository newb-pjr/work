$(document).ready(function(){
	$("#getUnBindCode").click(function(){
		$.post('Handler/getUnBindCode.ashx',{platformType:1,isWeb:1},function(data){
			var dataObj = eval("("+data+")");
				if(dataObj.status!=1){
					dataStatus(dataObj);
				}else{
					countDown("#getUnBindCode");
					alert("获取验证码成功");
				}
		})
	})
})
