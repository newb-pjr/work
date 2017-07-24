$(document).ready(function(){
	$(".shopRegSub").click(function(){
		var name = $("#shopName").val();
		var areaCode = $("#chooseAreaCity").val();
		var validCode = $(".codeText").val();
		var license = getCookie("uploadUrls");
		$.post('Handler/addStore.ashx',{name:name,areaCode:areaCode,license:license,validCode:validCode,platformType:1,isWeb:1},function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status != 1){
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
						alert("非机构用户");
						break;
				}
			}else{
				var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
				alert("注册成功，请耐心等待审核！");
				parent.layer.close(index);
			}
		})
	})
})
