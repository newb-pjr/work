$(document).ready(function(){
	$("#updateBtn").click(function(){
		var validMethod;
		var cardID = parent.$("#activeCardId").val();
		$("input[name='rule']").each(function(){
			if($(this).is(":checked")){
				validMethod = $(this).val();
			}
		})
		var validCode = $("#methodCode").val();
		if(validMethod==0){
			layer.prompt({
			  formType: 1,
			  title: '请设置您的用卡密码',
			}, function(first_pwd, first_index, first_elem){
				if(validatePassword(first_pwd)){
					var password = first_pwd;
				    layer.close(first_index);
				    layer.prompt({
					  formType: 1,
					  title: '请再次输入您的密码',
					}, function(second_pwd, second_index, second_elem){
						if(first_pwd!=second_pwd){
							alert("两次密码输入不一致！");
						}else{
							layer.close(second_index);
							updateValidMethod(cardID,validMethod,validCode,password);
						}
					});
				}else{
					alert("请输入6位以上数字字母混合密码！");
					first_elem.val("");
				}
			});
		}else{
			updateValidMethod(cardID,validMethod,validCode);
		}
	})
})

function updateValidMethod(cardID,validMethod,validCode,password){
	$.ajax({
		type:"post",
		url:"Handler/updateValidMethod.ashx",
		async:true,
		data:{platformType:1,isWeb:1,cardID:cardID,validMethod:validMethod,validCode:validCode,password:password},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				alert("修改规则成功！");
				window.parent.mainGoBack();
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
						alert("验证码不正确");
						break;
					case -6:
						alert("卡不存在");
						break;
					case -7:
						alert("卡不属于已登录的用户");
						break;
					case -8:
						alert("验证码不匹配");
						break;
					case -9:
						alert("卡已购买但未支付成功");
						break;
				}
			}
		}
	});
}
