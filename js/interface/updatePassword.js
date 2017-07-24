$(document).ready(function(){
	$("#passwordSubBtn").click(function(){
		var oldPsw = $.md5($("#oldPsw").val());
		var newPsw = $.md5($("#newPsw").val());
		var comfirmPsw = $.md5($("#confirmPsw").val());
		if(newPsw != comfirmPsw){
			alert("两次输入密码不一致");
		}else{
			$.post('Handler/updatePassword.ashx',{platformType:1,isWeb:1,oldPassword:oldPsw,newPassword:newPsw,validCode:$("#modifyCodeText").val()},function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status!=1){
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
							alert("登录已过期 ");
							break;
						case -5:
							alert("验证码不正确 ");
							break;
						case -6:
							alert("旧密码不正确 ");
							break;
						case -7:
							alert("手机号码或电子邮箱接收到的验证码不正确 ");
							break;
					}
				}else{
					alert("修改密码成功");
					closeTab('修改登录密码');
				}
			})
		}
	})
	
})
