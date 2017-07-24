//$(document).ready(function(){
//	$(".submit").click(function(){
//		if($("#password").val() == $("#confirm").val()){
//			var md5Pwd = $.md5($("#password").val()); 
//			$.post('Handler/changePasswordCode.ashx',{platformType:1,isWeb:1,checkMethod:1,equipmentCode:$("#phoneNum").val(),validCode:$("#code").val(),password:md5Pwd,checkCode:$("#checkCode").val()},function(data){
//				console.log(data);
//				var dataObj = eval("("+data+")");
//				if(!dataObj.status){
//					alert(dataObj.err);
//				}else{
//					switch(dataObj.status){
//						case 1:
//							alert("重置成功")
//							location.href = "login.html"
//							break;
//						case 0:
//							alert("重置失败");
//							break;
//						case -1:
//							alert("手机号码不存在");
//							break;
//						case -2:
//							alert("手机号码收到的验证码不匹配");
//							break;
//						case -3:
//							alert("验证码不正确");
//							break;
//					}
//				}
//			})
//		}else{
//			alert("输入两次密码不一致");
//			$("#password").focus().val("");
//			$("#confirm").val("");
//		}
//
//	})
//	
//})
function reset(checkMethod,equipmentCodeSelector){
	if($("#password").val() == $("#confirm").val()){
			var md5Pwd = $.md5($("#password").val()); 
			$.post('Handler/changePasswordCode.ashx',{platformType:1,isWeb:1,checkMethod:checkMethod,equipmentCode:$(equipmentCodeSelector).val(),validCode:$("#code").val(),password:md5Pwd,checkCode:$("#checkCode").val()},function(data){
				console.log(data);
				var dataObj = eval("("+data+")");
				if(!dataObj.status){
					alert(dataObj.err);
				}else{
					switch(dataObj.status){
						case 1:
							alert("重置成功")
							location.href = "login.html"
							break;
						case 0:
							alert("重置失败");
							break;
						case -1:
							alert("手机号码不存在");
							break;
						case -2:
							alert("手机号码收到的验证码不匹配");
							break;
						case -3:
							alert("验证码不正确");
							break;
					}
				}
			})
		}else{
			alert("输入两次密码不一致");
			$("#password").focus().val("");
			$("#confirm").val("");
		}
}
