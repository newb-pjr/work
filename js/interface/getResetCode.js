//$(document).ready(function(){
//	$(".getCode").click(function(){
//		$.post('Handler/getPasswordCode.ashx',{platformType:1,isWeb:1,checkMethod:1,equipmentCode:$("#phoneNum").val(),checkCode:$("#checkCode").val()},function(data){
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
//					case -1:
//						alert("手机号码不存在");
//						break;
//					case -2:
//						alert("验证码不正确");
//						break;
//					case -3:
//						alert("验证次数超过限制");
//						break;
//					case -4:
//						alert("一分钟内请求超过1 次");
//						break;
//				}
//			}
//			
//		})
//	})
//})
function getResetCode(checkMethod,equipmentCodeSelector){
	$.post('Handler/getPasswordCode.ashx',{platformType:1,isWeb:1,checkMethod:checkMethod,equipmentCode:$(equipmentCodeSelector).val()},function(data){
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
						alert("手机号码或电子邮箱不存在");
						break;
					case -2:
						alert("验证码不正确");
						break;
					case -3:
						alert("验证次数超过限制");
						break;
					case -4:
						alert("一分钟内请求超过1 次");
						break;
					case -5:
						alert("同一设备一分钟内验证超过 1 次");
						break;
				}
			}
			
	})
}
