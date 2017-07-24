$(document).ready(function(){
	$("#accountSub").click(function(){
		var name = parent.$("#name").val();
		if(parent.$("#phone").is(":checked")){
			var mobile = parent.$("#mobileNew").val();
			var checkMethod = 0;
			var newCheckMethod = 0;
		}
		if(parent.$("#mail").is(":checked")){
			var email = parent.$("#emailNew").val();
			var checkMethod = 1;
			var newCheckMethod = 1;
		}
		if(!parent.$("#changeValidWay input[type='checkbox']").is(":checked")){
			var mobile = parent.$("#mobile").val();
			var email = parent.$("#mail").val();
		}
		var address = parent.$("#address").val();
		var country = parent.$("#country").val();
		var area = parent.$("#area").val();
		var contact = parent.$("#contact").val();
		var contactTel = parent.$("#contactTel").val();
		var contactMobile = parent.$("#contactMobile").val();
		var contactEmail = parent.$("#contactEmail").val();
		var unBindCode = $("#unBindCodeText").val();
		var bindCode = $("#BindCodeText").val();
		$.ajax({
			type:"post",
			url:"Handler/updateUserInfo.ashx",
			async:false,
			data:{platformType:1,isWeb:1,name:name,mobile:mobile,email:email,address:address,country:country,area:area,contact:contact,contactTel:contactTel,contactMobile:contactMobile,contactEmail:contactEmail,checkMethod:checkMethod,newCheckMethod:newCheckMethod,unBindCode:unBindCode,bindCode:bindCode},
			success: function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					alert("修改用户信息成功");
					layer.closeAll();
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
			}
		});
	})
})
