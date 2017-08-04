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
					TaskID = dataObj.taskID+1000;
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
		var SrcImgID = getCookie("SrcImgID");
		var ImgIDs = $(".imgframe img").attr("src").substring($(".imgframe img").attr("src").lastIndexOf('/')+1);
		var MarkClass = $("#markClassS").val().replace(/,/g,";");
		var MarkGroup = $("#markGroupS").val().replace(/,/g,";");
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
					QueryMode:"",
					SrcImgID:SrcImgID,
					ImgIDs:ImgIDs,
					CnContent:"",
					EnContent:"",
					ImageCode:"",
					MarkClass:MarkClass,
					MarkGroup:MarkGroup,
					ImageQueryMode:"",
					ImageAlgorithm:"",
					CnQueryMode:"",
					CnAlgorithm:"",
					EnQueryMode:"",
					EnAlgorithm:"",
					CodeQueryMode:"",
					CodeAlgorithm:"",
					State:"",
					DateType:0,
					BeginDate:"",
					EndDate:""
			},
			async:false,
			success:function(data){
				var dataObj = data;
				if(dataObj.data.Result == ""){
					alert("没有查询结果！");
					layer.close(searchloading);
					return false;
				}
				if(dataObj.status == 1){
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
			console.log(isBreak)
			n++;
		},1000)
	})
})
