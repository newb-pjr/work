$(document).ready(function(){
	$(".sureBtn").click(function(){
		var searchloading = layer.load(1, {
		  shade: [0.5,'#000']
		});
		var breakGo = false;
		var isBreak = false;
		var validMethod;
		var TaskID;
		$.ajax({
			type:"post",
			url:"Handler/getTaskID.ashx",
			async:false,
			data:{platformType:1,isWeb:1},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					TaskID = dataObj.taskID;
					if(TaskID==""){
						alert("获取TaskID出错！")
						layer.close(searchloading);
						breakGo = true;
					}
				}else{
					dataStatus(dataObj);
					layer.close(searchloading);
					breakGo = true;
				}
			}
		});
		if(breakGo){
			return false;
		}
		document.cookie = "TaskID="+TaskID;
		$.ajax({
			type:"post",
			url:"Handler/userInfo.ashx",
			async:false,
			data:{platformType:1,isWeb:1},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					if(dataObj.userInfo.userCard==""){
						alert("当前国方卡已过期，请购卡或激活卡再进行操作！");
						layer.close(searchloading);
						breakGo = true;
					}else{
						validMethod = dataObj.userInfo.userCard.validMethod;
					}
				}else{
					dataStatus(dataObj);
					layer.close(searchloading);
					breakGo = true;
				}
			}
		});
		if(breakGo){
			return false;
		}
		
		var FrontCount = 16;
		var QueryMode = $(".qureySelect").val();
		var SrcImgID = getCookie("SrcImgID");
		var mainImg = getCookie("cutImgUrl").substring(getCookie("cutImgUrl").lastIndexOf('/')+1);
		var chooseImg = getCookie("chooseImg").split(",");
		var finishImg = getCookie("finishImg").split(",");
		var chooseImgFileName = [];
		var finishImgFileName = [];
		for(var i=0; i<chooseImg.length; i++){
			chooseImgFileName.push(chooseImg[i].substring(chooseImg[i].lastIndexOf('/')+1));
		}
		chooseImg = chooseImgFileName.join();
		for(var i=0; i<finishImg.length; i++){
			finishImgFileName.push(finishImg[i].substring(finishImg[i].lastIndexOf('/')+1));
		}
		finishImg = finishImgFileName.join();
		if($("#assemble").html() == ""){
			var ImgIDs = mainImg+","+chooseImg;
		}else{
			var ImgIDs = mainImg+","+finishImg+","+chooseImg;
		}
		ImgIDs = ImgIDs.split(",").join(";");
		var CnContent = $("#searchAllChinese").val();
		var EnContent = $("#searchAllEnglish").val();
		var ImageCode = $("#searchAllContText").val();
		var MarkClass = $("#markClassS").val().replace(/,/g,";");
		var MarkGroup = $("#markGroupS").val().replace(/,/g,";");
		var ImageAlgorithm = "";
		var CnAlgorithm = "";
		var EnAlgorithm = "";
		var CodeAlgorithm = "";
		var ImageQueryMode = ""
		var CnQueryMode = "";
		var EnQueryMode = "";
		var CodeQueryMode = "";
		$("input[name='algorithm']").each(function(){
			if($(this).is(":checked")){
				if($(this).val() == 0){
					ImageQueryMode = 0;
					CnQueryMode = 0;
					EnQueryMode = 0;
					CodeQueryMode = 0;
				}
				if($(this).val() == 1){
					ImageQueryMode = 1;
					CnQueryMode = 1;
					EnQueryMode = 1;
					CodeQueryMode = 1;
				}
				if($(this).val() == 2){
					ImageAlgorithm = $("#imageAlgorithm").val();
					CnAlgorithm = $("#cnAlgorithm").val();
					EnAlgorithm = $("#enAlgorithm").val();
					CodeAlgorithm = $("#codeAlgorithm").val();
					ImageQueryMode = 2;
					CnQueryMode = 2;
					EnQueryMode = 2;
					CodeQueryMode = 2;
					if(ImageAlgorithm == "" && CnAlgorithm == "" && EnAlgorithm == "" && CodeAlgorithm == ""){
						alert("具体算法内容不能为空！");
						layer.close(searchloading);
						breakGo = true;
					}
				}
			}
		})
		if(breakGo){
			return false;
		}
		var State = $(".tabSearch tr td input[name='status']").val();
		var DateType = $("#selectDateType").val();
		if(DateType == 0){
			var BeginDate = "";
			var EndDate = "";
		}else{
			if($("#dateInput").val() == ""){
				alert("日期范围不能为空！");
				return false;
			}else{
				var BeginDate = dateSelect($("#dateInput").val())[0];
				var EndDate = dateSelect($("#dateInput").val())[1];
			}
		}
		var firstTry = $.ajax({
			type:"post",
			url:"Handler/searchByImg.ashx",
			complete:function(){
				isBreak = true;
			},
			data:{
					platformType:1,
					isWeb:1,
					TaskID:TaskID,
					FrontCount:FrontCount,
					QueryMode:QueryMode,
					SrcImgID:SrcImgID,
					ImgIDs:ImgIDs,
					CnContent:CnContent,
					EnContent:EnContent,
					ImageCode:ImageCode,
					MarkClass:MarkClass,
					MarkGroup:MarkGroup,
					ImageQueryMode:ImageQueryMode,
					ImageAlgorithm:ImageAlgorithm,
					CnQueryMode:CnQueryMode,
					CnAlgorithm:CnAlgorithm,
					EnQueryMode:EnQueryMode,
					EnAlgorithm:EnAlgorithm,
					CodeQueryMode:CodeQueryMode,
					CodeAlgorithm:CodeAlgorithm,
					State:State,
					DateType:DateType,
					BeginDate:BeginDate,
					EndDate:EndDate
			},
			async:false,
			success:function(data){
				var dataObj = data;
				if(dataObj.data.Result == ""){
					alert("没有查询结果！");
					layer.close(searchloading);
					return false;
				}
				if(data.status == 1){
					window.data = dataObj.data;
					validMethodFunc(validMethod,searchloading);
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
					layer.close(searchloading);
				}
			}
		});
		
		var n=0;
		var timer = setInterval(function(){
			if(n>30){
				firstTry.abort();
				var secondTry = taskIDAjax(validMethod,searchloading);
			}
			switch (n){
				case n>35:
					secondTry.abort();
					var thirdTry = taskIDAjax(validMethod,searchloading);
					break;
				case n>40:
					thirdTry.abort();
					var fourthTry = taskIDAjax(validMethod,searchloading);
					break;
				case n>45:
					fourthTry.abort();
					clearInterval(timer);
					alert("请求数据超时！");
					break;
				default:
					break;
			}
			if(isBreak){
				clearInterval(timer);
			}
			n++;
		},1000)
	})
})
