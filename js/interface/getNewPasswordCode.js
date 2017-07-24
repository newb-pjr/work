$(document).ready(function(){
	$("#getModifyCode").click(function(){
		$.post('Handler/getNewPasswordCode.ashx',{platformType:1,isWeb:1},function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status != 1){
				switch(dataObj.status){
					case 0:
						alert(dataObj.err);
						break;
					case -1:
						alert("用户不存在");
						break;	
					case -2:
						alert("登录信息不存在");
						break;
					case -3:
						alert("用户 ID 与登录信息不匹配");
						break;
					case -4:
						alert("登录已过期");
						break;
					case -5:
						alert("验证码不匹配");
						break;
					case -6:
						alert("同一设备一分钟内验证次数超过 1 次");
						break;
					case -7:
						alert("手机号码或电子邮箱验证次数超过当天限制");
						break;
				}	
			}else{
				countDown("#getModifyCode");
				alert("获取验证码成功！");	
			}
		})
	})
})
