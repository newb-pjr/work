$(document).ready(function(){
	$("#addImages").click(function(){
		if($("#addImgCont").html()==""){
			likePic();
		}
		var imgUrl = getCookie("imgUrl");
		var defImage = JSON.parse(getCookie("defimage"));
		if(getCookie("finishImg") != ""){
			var finishImg = getCookie("finishImg").split(",");
		}
		if(typeof(getCookie("chooseImg")) != "undefined"){
			var chooseImg = getCookie("chooseImg").split(",");
		}
		$(".childImg ul").html("");
		if($("#assemble li").length == 0){
			if(getCookie("chooseImg") == ""){
				for(var i=0; i<defImage.length; i++){
					$(".childImg ul").append('<li><img src="'+defImage[i].DefImageUrl+'" /></li>')
				}
			}else{
				for(var i=0; i<chooseImg.length; i++){
					$(".childImg ul").append('<li><img src="'+chooseImg[i]+'" /></li>')
				}
			}
		}else{
			if(typeof(finishImg) != "undefined"){
				for(var i=0; i<finishImg.length; i++){
					$(".childImg ul").append('<li><img src="'+finishImg[i]+'" /></li>')
				}
			}
			if(getCookie("chooseImg") != ""){
				for(var i=0; i<chooseImg.length; i++){
					$(".childImg ul").append('<li><img src="'+chooseImg[i]+'" /></li>')
				}
			}
//			var TopCount = $("#selectNum").val();
//			$.post('Handler/searchTradeMarkByImage.ashx',{platformType:1,isWeb:1,Url:Url,Urls:Urls,TopCount:TopCount,needCut:0},function(data){
//				var dataObj = data;
//				if(dataObj.status !=1){
//					switch(dataObj.status){
//						case 0:
//							alert(dataObj.err);
//							break;
//						case -1:
//							alert("用户不存在");
//							break;
//						case -2:
//							alert("登录信息不存在");
//							break;
//						case -3:
//							alert("用户 ID 与登录信息不匹配");
//							break;
//						case -4:
//							alert("登录已过期 ");
//							break;
//						case -5:
//							alert("验证码不正确");
//							break;
//					}
//				}else{
//					var TaskID = dataObj.data.TaskID;
//					var EndRow = $("#selectNum").val();
//					$.post('Handler/getSearchResultByTaskID.ashx',{platformType:1,isWeb:1,TaskID:TaskID,SortType:"",BeginRow:1,EndRow:EndRow},function(data){
//						var dataObj = eval("("+data+")");
//						if(dataObj.status == 0){
//							alert(dataObj.err);
//						}
//						if(dataObj.status == 1){
//							for(var i=0;i<dataObj.data.MarkInfo.length;i++){
//								$("#addImgCont").append('<li><input type="checkbox" class="tabImgCheckbox" name="imgCheckbox" /><img src="'+dataObj.data.MarkInfo[i].MarkImagePath+'" width="165" height="111" /></li>');
//							}
//						}
//					})
//				}
//			})
		}
	})
	
	$("#likePic").click(function(){
		$("#addImgCont").html("");
		var SrcImgID = getCookie("SrcImgID");
		var imgJson = JSON.parse(getCookie("imgResult"));
		var defImage = JSON.parse(getCookie("defimage"));
		var imgJsonArr = [];
		if($("#assemble li").length == 0){
			for(var i=0; i<defImage.length; i++){
				imgJsonArr.push(defImage[i].FileName);
			}
		}else{
			for(var i=0; i<imgJson.length; i++){
				imgJsonArr.push(imgJson[i].FileName);
			}
		}
		var ImgIDs = imgJsonArr.join(";");
		var TopCount = $("#selectNum").val();
		$.ajax({
			type:"post",
			url:"Handler/getSimilarImg.ashx",
			data:{platformType:1,isWeb:1,SrcImgID:SrcImgID,ImgIDs:ImgIDs,TopCount:TopCount},
			async:true,
			success:function(data){
				for(var i=0; i<data.data.url.length; i++){
					$("#addImgCont").append('<li><label><input type="checkbox" class="tabImgCheckbox" name="imgCheckbox" /><img src="'+data.data.url[i].ImgUrl+'" height="111" width="165" /></label></li>');
				}
			}
		});
	})
	
	$("#showAllImg").click(function(){
		$("#assemble").html("");
		if(getCookie('finishImg')!=""){
			var finishImg = getCookie('finishImg').split(',');
			for(var i=0; i<finishImg.length; i++){
				$("#assemble").append('<li><img src="'+finishImg[i]+'" width="165" height="111" /></li>')
			}
		}
		if(getCookie('chooseImg')!=""){
			var chooseImg = getCookie('chooseImg').split(',');
			for(var i=0; i<chooseImg.length; i++){
				$("#assemble").append('<li><img src="'+chooseImg[i]+'" width="165" height="111" /></li>')
			}
		}
	})
})

function likePic(){
	var SrcImgID = getCookie("SrcImgID");
	var imgJson = JSON.parse(getCookie("imgResult"));
	var defImage = JSON.parse(getCookie("defimage"));
	var imgJsonArr = [];
	if($("#assemble li").length == 0){
		for(var i=0; i<defImage.length; i++){
			imgJsonArr.push(defImage[i].FileName);
		}
	}else{
		for(var i=0; i<imgJson.length; i++){
			imgJsonArr.push(imgJson[i].FileName);
		}
	}
	var ImgIDs = imgJsonArr.join(";");
	var TopCount = $("#selectNum").val();
	$.ajax({
		type:"post",
		url:"Handler/getSimilarImg.ashx",
		data:{platformType:1,isWeb:1,SrcImgID:SrcImgID,ImgIDs:ImgIDs,TopCount:TopCount},
		async:true,
		success:function(data){
			for(var i=0; i<data.data.url.length; i++){
				$("#addImgCont").append('<li><label><input type="checkbox" class="tabImgCheckbox" name="imgCheckbox" /><img src="'+data.data.url[i].ImgUrl+'" height="111" width="165" /></label></li>');
			}
		}
	});
}
