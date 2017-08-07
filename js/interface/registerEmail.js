$(document).ready(function(){
	$(".submit").click(function(){
		if(!validatePassword($("#password").val())){
			alert("只能输入6-16个字母、数字、下划线的密码！");
			return false;
		}
		if($("#password").val() == $("#confirm").val()){
			var md5Pwd = $.md5($("#password").val()); 
			if($("#isInstitution").is(":checked")){
				$("#isInstitution").val(1);
			}else{
				$("#isInstitution").val(0);
			}
			$.post('Handler/register.ashx',{platformType:1,isWeb:1,userName:$("#userName").val(),password:md5Pwd,checkMethod:2,email:$("#email").val(),name:$("#name").val(),validCode:$("#code").val(),isInstitution:$("#isInstitution").val()},function(data){
				console.log(data);
				var dataObj = eval("("+data+")");
				switch(dataObj.status){
					case 1:
						alert("注册成功")
						location.href = "login.html"
						break;
					case 0:
						alert(dataObj.err);
						break;
					case -1:
						alert("账号已被使用");
						break;
					case -2:
						alert("手机号码已被使用");
						break;
					case -3:
						alert("电子邮箱已被使用");
						break;
					case -4:
						alert("验证码不匹配 ");
						break;
					case -5:
						alert("手机验证码不正确");
						break;
				}
			})
		}else{
			alert("输入两次密码不一致");
			$("#password").focus().val("");
			$("#confirm").val("");
		}

	})
	
})

//function register(checkMethod,regWay,value){
//		if($("#password").val() == $("#confirm").val()){
//			var md5Pwd = $.md5($("#password").val()); 
//			if(regWay==1){
//				way = 'mobile';
//			}
//			if(regWay==2){
//				way = 'email';
//			}
//			$.post('Handler/register.ashx',{platformType:1,isWeb:1,userName:$("#name").val(),password:md5Pwd,checkMethod:checkMethod,way:value,validCode:$("#code").val(),checkCode:$("#checkCode").val()},function(data){
//				console.log(data);
//				var dataObj = eval("("+data+")");
//				if(!dataObj.status){
//					alert(dataObj.err);
//				}else{
//					switch(dataObj.status){
//						case 1:
//							alert("注册成功")
//							location.href = "login.html"
//							break;
//						case 0:
//							alert("注册失败");
//							break;
//						case -1:
//							alert("账号已被使用");
//							break;
//						case -2:
//							alert("手机号码已被使用");
//							break;
//						case -3:
//							alert("电子邮箱已被使用");
//							break;
//						case -4:
//							alert("验证码不匹配 ");
//							break;
//						case -5:
//							alert("手机验证码不正确");
//							break;
//					}
//				}
//			})
//		}else{
//			alert("输入两次密码不一致");
//			$("#password").focus().val("");
//			$("#confirm").val("");
//		}
//}
