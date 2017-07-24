$(document).ready(function(){
	$(".getShopCode").click(function(){
		$.post('Handler/getNewStoreCode.ashx',{platformType:1,isWeb:1},function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status == 1){
				alert("验证码已发送！");
				countDown(".getShopCode");
			}else{
				switch(dataObj.status){
					case 0:
						alert(dataObj.err);
						break;
					case -1:
						alert("账号已被使用");
						break;	
					case -2:
						alert("手机号码已被注册");
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
	})
})
