$("#replaceImg").click(function(){
	if($("#addImgCont li input:checked").length == 1){
		$("#addImgCont li input:checked").each(function(){
			imgUrl = $(this).next().attr("src");
			$(".imgframe img").attr("src",imgUrl);
		})
		$.post('Handler/imageSplit.ashx',{platformType:1,isWeb:1,Url:imgUrl,needCut:""},function(data){
			console.log(data)
			var dataObj = data;
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
				}
			}else{
				document.cookie = "imgUrl="+dataObj.data.url;
				document.cookie = "cutImgUrl="+dataObj.url;
				document.cookie = "imgCount="+dataObj.data.count;
				handleTab('sbsb-fczh.html','商标识别确认');
			}
		})
	}else{
		alert("只能选择一个近似图替换为主图！");
	}
	
})