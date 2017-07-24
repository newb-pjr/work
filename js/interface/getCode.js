//$(document).ready(function(){
//	$(".getCode").click(function(){
//		$.post('Handler/getRegisterCode.ashx',{platformType:1,isWeb:1,userName:$("#name").val(),checkMethod:1,equipmentCode:$("#phoneNum").val(),checkCode:$("#checkCode").val()},function(data){
//			console.log(data);
//			var dataObj = eval("("+data+")");
//			if(!dataObj.status){
//				alert(dataObj.err);
//			}else{
//				switch(dataObj.status){
//					case 1:
//						alert("验证码已发送");
//						break;
//					case 0:
//						alert("操作失败");
//						break;
//					case -2:
//						alert("手机号码已被注册");
//						break;
//					case -4:
//						alert("验证码不匹配");
//						break;
//					case -5:
//						alert("验证次数超过限制");
//						break;
//					case -6:
//						alert("一分钟内请求超过1 次");
//						break;
//				}
//			}
//			
//		})
//	})
//})
function getCode(checkMethod,equipmentCodeSelector){
		$.post('Handler/getRegisterCode.ashx',{platformType:1,isWeb:1,userName:$("#userName").val(),checkMethod:checkMethod,equipmentCode:$(equipmentCodeSelector).val()},function(data){
			console.log(data);
			var dataObj = eval("("+data+")");
			if(!dataObj.status){
				alert(dataObj.err);
			}else{
				switch(dataObj.status){
					case 1:
						alert("验证码已发送");
						countDown(".getCode");
						break;
					case 0:
						alert(dataObj.err);
						break;
					case -1:
						alert("账号已被使用");
						break;	
					case -2:
						alert("手机号码已被注册");
						break;
					case -3:
						alert("电子邮箱重复");
						break;
					case -4:
						alert("验证码不匹配");
						break;
					case -5:
						alert("验证次数超过限制");
						break;
					case -6:
						alert("一分钟内请求超过1 次");
						break;
				}
			}
			
		})
}


