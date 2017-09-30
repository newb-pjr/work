$(document).ready(function(){
	if(!getCookie('isAutoLogin')){
		return false;
	}else{
		$("#isAutoLogin").attr("checked","checked");
		$.ajax({
			type:"post",
			url:"Handler/autoLogin.ashx",
			async:false,
			data:{platformType:1,isWeb:1},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					document.cookie = "username="+dataObj.userInfo.userName;
					var x = screen.availWidth-10;  
					var y = screen.availHeight-60;
					window.open("main.html","_blank",'fullscreen=yes,channelmode=yes,titlebar=no,toolbar=no,scrollbars=auto,resizable=no,status=no,copyhistory=no,location=no,menubar=no,width='+x+',height='+y);  
	//				location.href = "main.html";
				}else{
					switch(dataObj.status){
						case 0:
							alert(dataObj.err);
							break;
						case -1:
							alert("登录设备未注册");
							break;
						case -2:
							alert("设备未授权");
							break;
						case -3:
							alert("没有对应的用户信息");
							break;
						case -4:
							alert("验证码不匹配 ");
							break;
					}
				}
			}
		});
	}
})
