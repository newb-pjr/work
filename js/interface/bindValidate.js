function bindValidate(checkMethod){
	if($("#mobile").val() != ""){
		$.post(url+'Handler/updateUserInfo.ashx',{platformType:1,isWeb:1,name:$("#name").val(),mobile:$("#newEquipment").val(),address:$("#address").val(),country:$("#country").val(),area:$("#area").val(),contact:$("#contact").val(),contactTel:$("#contactTel").val(),contactMobile:$("#contactMobile").val(),contactEmail:$("#contactEmail").val(),checkMethod:checkMethod,newCheckMethod:checkMethod,unBindCode:$("#unBindCodeText").val(),bindCode:$("#bindCodeText").val()},function(data){
			console.log(data);
			var dataObj = eval("("+data+")");
			if(!dataObj.status){
				alert(dataObj.err);
			}else{
				switch(dataObj.status){
					case 1:
						$("#phoneSubBtn").parent().parent().hide();
						$("#phoneSubBtn").parent().parent().prev().show().children(".handleInfoDiv").hide();
						alert("绑定成功");
						break;
					case 0:
						alert("修改密码失败");
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
	}else{
		$.post(url+'Handler/updateUserInfo.ashx',{platformType:1,isWeb:1,name:$("#name").val(),email:$("#newEquipment").val(),address:$("#address").val(),country:$("#country").val(),area:$("#area").val(),contact:$("#contact").val(),contactTel:$("#contactTel").val(),contactMobile:$("#contactMobile").val(),contactEmail:$("#contactEmail").val(),checkMethod:checkMethod,newCheckMethod:checkMethod,unBindCode:$("#unBindCodeText").val(),bindCode:$("#bindCodeText").val()},function(data){
			console.log(data);
			var dataObj = eval("("+data+")");
			if(!dataObj.status){
				alert(dataObj.err);
			}else{
				switch(dataObj.status){
					case 1:
						$("#phoneSubBtn").parent().parent().hide();
						$("#phoneSubBtn").parent().parent().prev().show().children(".handleInfoDiv").hide();
						alert("绑定成功");
						break;
					case 0:
						alert("修改密码失败");
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
	}
	
}


