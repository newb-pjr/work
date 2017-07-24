function imageSplit(){
	if($("#id_top").val() != ""){
		$("#crop_form input[name='needCut']").val(1);
		console.log($("#crop_form input[name='needCut']").val())
	}else{
		$("#crop_form input[name='needCut']").val("");
	}
	var formData = new FormData($("#crop_form")[0]);
	formData.append("width",$("#imghead").attr("width"));
	formData.append("height",$("#imghead").attr("height"));
	formData.append("SrcImgID","");
	$.ajax({
		type:"post",
		url:"Handler/imgPartition.ashx",
		data:formData,
		processData:false,
		contentType:false,
		success:function(data){
			//var dataObj = eval("("+data+")");
			var dataObj = data;
			if(dataObj.status != 1){
				switch(dataObj.status){
					case 0:
						if(dataObj.err == "输入字符串的格式不正确。"){
							alert("请选取图标后进行操作！")
						}else{
							alert(dataObj.err);
						}
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
				var index = parent.layer.getFrameIndex(window.name);
				document.cookie = "imgUrl="+dataObj.data.url;
				document.cookie = "cutImgUrl="+dataObj.url;
				document.cookie = "imgCount="+dataObj.data.count;
				document.cookie = "SrcImgID="+dataObj.SrcImgID;
				document.cookie = "color="+JSON.stringify(dataObj.data.color);
				document.cookie = "defimage="+JSON.stringify(dataObj.data.defimage);
				document.cookie = "chooseImg=";
				document.cookie = "finishImg=";
//				parent.$(".loading").hide();
//				window.parent.$(".imgframe").append('<img src="'+dataObj.url+'" />');
				parent.$(".imgframe img").attr("src",dataObj.url);
				window.parent.$('#tt').tabs('close','商标识别-高级识别');
				handleTab('sbsb-fczh-jd.html','商标识别','商标识别-裁剪');
				parent.layer.close(index);
			}
		}
	});
//	$.post('Handler/imageSplit.ashx',formData,function(data){
//		var dataObj = eval("("+data+")");
//		if(dataObj.status != 1){
//			switch(dataObj.status){
//				case 0:
//					alert(dataObj.err);
//					break;
//				case -1:
//					alert("用户不存在");
//					break;
//				case -2:
//					alert("登录信息不存在");
//					break;
//				case -3:
//					alert("用户 ID 与登录信息不匹配");
//					break;
//				case -4:
//					alert("登录已过期 ");
//					break;
//				case -5:
//					alert("验证码不正确");
//					break;
//			}
//		}else{
//			alert(123)
//			//handleTab('sbsb-fczh.html','商标识别确认','商标识别');
//		}
//	})
}
