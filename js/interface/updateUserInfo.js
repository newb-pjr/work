$(document).ready(function(){
	$("#modifyValid").click(function(){
		if($("#phone").is(":checked")){
			var phone = $("#mobileNew").val();
			if(!validatePhone(phone)){
				alert("请输入正确的11位手机号码");
				return false;
			}
		}
		if($("#mail").is(":checked")){
			var email = $("#emailNew").val();
			if(!validateMail(email)){
				alert("请输入正确的电子邮箱格式");
				return false;
			}
		}	
		handleLayer('注册信息','wdzh-yz.html')
	})
	
	$("#updatePersonInfo").click(function(){
		if($("#name").val()==""){
			alert("真实姓名不能为空！");
			return false;
		}
		if($("#contactTel").val()==""){
			alert("联系电话不能为空！");
			return false;
		}
		if($("#contactEmail").val()==""){
			alert("邮箱不能为空！");
			return false;
		}
		$.post('Handler/updateUserInfo.ashx',{platformType:1,isWeb:1,name:$("#name").val(),mobile:$("#mobile").val(),email:$("#email").val(),address:$("#address").val(),country:$("#country").val(),area:$("#area").val(),contact:$("#contact").val(),contactTel:$("#contactTel").val(),contactMobile:$("#contactMobile").val(),contactEmail:$("#contactEmail").val()},function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				alert("修改用户信息成功");
			}else{
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
						alert("验证码不匹配 ");
						break;
					case -6:
						alert("手机号码与其他用户重复 ");
						break;
					case -7:
						alert("电子邮箱与其他用户重复 ");
						break;
					case -8:
						alert("验证手机号码或邮箱已更改但未设置验证 ");
						break;
					case -9:
						alert("解绑验证码不匹配 ");
						break;
					case -10:
						alert("绑定验证码不匹配 ");
						break;
				}
			}
		})
	})
})
