$(document).ready(function(){
	$("#saveFile").click(function(){
		var formData = new FormData($("#onlineUpfileForm")[0]);
		formData.append("formName","apply,licence,agent,other");
		formData.append("platformType",1);
		formData.append("isWeb",1);
//		formData.append("needCut",0);
//		var formName =
		$.ajax({
			type:"post",
			url:"Handler/upfileMulti.ashx",
//			data:{formName:"apply,licence,agent,other",platformType:1,isWeb:1},
			data:formData,
			processData:false,
			contentType:false,
			success:function(data){
				var dataObj = data;
				if(dataObj.status == 1){
					alert("上传成功！");
					for(var i=0; i<dataObj.data.length; i++){
						$("#"+dataObj.data[i].file).attr("href",dataObj.data[i].url);
					}
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
					}
				}
			}
		});
	})
})
