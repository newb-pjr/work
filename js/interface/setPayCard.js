$(document).ready(function(){
	$("#active").change(function(){
		$.post(url+'Handler/setPayCard.ashx',{platformType:1,isWeb:1,cardID:$("#active").val()},function(data){
			console.log(data);
			var dataObj = eval("("+data+")");
			if(dataObj.status != 1){
				switch(dataObj.status){
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
						alert("卡不存在 ");
						break;
					case -7:
						alert("卡不属于已登录的用户 ");
						break;
					case -8:
						alert("卡已启用");
						break;
					case -9:
						alert("卡已购买但未支付成功");
						break;
				}
			}else{
				alert("设置成功！")
			}
		})
	})
})
