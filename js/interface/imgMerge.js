$(document).ready(function(){
	var url = getCookie("imgUrl");
	var count = getCookie("imgCount");
	var color = JSON.parse(getCookie("color"));
	var SrcImgID = getCookie("SrcImgID");
	$(".groupImgCont img").last().attr("src",url);
	var s = 0;
	for(var i=0;i<count;i++){
		s++;
		$(".groupContRight ul").append('<li style="background-color:'+color[i].ColorData+'">'+s+'</li>');
	}
	$(".groupContRight ul").append('<div class="cls"></div>');
	
	$("#continue").click(function(){
			
		input = $(".groupContRight input");
		for(var i=0; i<count;i++){
			if($(".groupContRight ul li").eq(i).hasClass("on")){
				var values = $(".groupContRight ul li").eq(i).text()
				var currentValues = input.val();
				input.val(currentValues+values+",");
			}
						
		}
		currentValues = input.val();
		currentValues = currentValues.substring(0,currentValues.length-1);
		input.val(currentValues+";");
		$(".groupContRight ul li").removeClass("on");
		currentValues = input.val();
		//alert(currentValues)
		var strArr = currentValues.split(";");
		strArr.sort();
		var result = new Array();
		var tempStr = "";
		for(var i in strArr){
			if(strArr[i]!=tempStr){
				result.push(strArr[i]);
				tempStr = strArr[i];
			}else{
				continue;
			}
		}
		input = result.join(";")
		//console.log(result);console.log(input);
		$(".groupContRight input").val(input+";");
	})
	
//	$("#sureBtn").click(function(){
//		console.log(314313)
//	})
	
//	$("#sureBtn").click(function(){
//		var regFir = new RegExp(";","g");
//		var regSec = new RegExp(",","g");
//		var inputValues = $(".groupContRight input").val();
//		if(inputValues == ""){
//			alert("未选择需要的商标分拆组合！");
//			return false;
//		}
//		var Num = inputValues.substring(0,inputValues.length-1).replace(regFir,"|").replace(regSec,";");
//		$.post('Handler/imgMerge.ashx',{platformType:1,isWeb:1,SrcImgID:SrcImgID,Num:Num},function(data){
//			var dataObj = data;
//			if(dataObj.status !=1){
//				switch(dataObj.status){
//					case 0:
//						alert(dataObj.err);
//						break;
//					case -1:
//						alert("用户不存在");
//						break;
//					case -2:
//						alert("登录信息不存在");
//						break;
//					case -3:
//						alert("用户 ID 与登录信息不匹配");
//						break;
//					case -4:
//						alert("登录已过期 ");
//						break;
//					case -5:
//						alert("验证码不正确");
//						break;
//				}
//			}else{
//				parent.$("#assemble").html("");
//				var finishImg = [];
//				var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
//				for(var i=0;i<dataObj.data.Url.length;i++){
//					parent.$('#assemble').append('<li><input type="checkbox" class="tabImgCheckbox" /><img src="'+dataObj.data.Url[i].ImgUrl+'" width="165" height="111" /></li>');
//					finishImg.push(dataObj.data.Url[i].ImgUrl);
//				}
//				document.cookie = "finishImg="+finishImg.join();
//				parent.layer.close(index);
//			}
//		})
//	})
	
	$("#result").click(function(){
		var regFir = new RegExp(";","g");
		var regSec = new RegExp(",","g");
		var inputValues = $(".groupContRight input").val();
		if(inputValues == ""){
			alert("未选择需要的商标分拆组合！");
			return false;
		}
		var Num = inputValues.substring(0,inputValues.length-1).replace(regFir,"|").replace(regSec,";");
		$.post('Handler/imgMerge.ashx',{platformType:1,isWeb:1,SrcImgID:SrcImgID,Num:Num},function(data){
			var dataObj = data;
			if(dataObj.status !=1){
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
				document.cookie = 'imgResult='+JSON.stringify(dataObj.data.Url);
				handleLayer('预览结果','sbsb-cfzh-yl.html');
			}
		})
	})
})


