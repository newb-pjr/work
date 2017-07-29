$(document).ready(function(){
	$("#search").click(function(){
		var breakGo = false;
		var searchloading = layer.load(1, {
		  shade: [0.5,'#000']
		});
		var isBreak = false;
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
		var validMethod;
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
		var SearchMode = 0;
		if($("#contentSelect").val() == -1){
			alert("请选择正确的内容种类！");
			layer.close(searchloading);
			return false;
		}else{
			SearchType = $("#contentSelect").val();
		}
		if(Content = $(".searchContText").val() == ""){
			alert("内容不能为空！");
			layer.close(searchloading);
			return false;
		}else{
			Content = $(".searchContText").val();
		}
		var MarkClass = $("#markClass").val().replace(/,/g,";");
		var MarkGroup = $("#markGroup").val().replace(/,/g,";");
		var QueryMode = $("input[name='group2']:checked").val();
		if(QueryMode == ""){
			QueryMode = 0;
		}
		var State = $(".searchContTable input[name='group3']:checked").val();
		if($("#self").is(":checked")){
			var Algorithm = $("#contentSelect").val()+"_"+$("#Algorithm").val();
		}else{
			var Algorithm = "";
		}
		var dateSelectValue = $("#dateSelect").val();
		if($("#dateClassSelect").val() == 0){
			BeginDate = "";
			EndDate = "";
		}else{
			if(dateSelectValue == ""){
				alert("日期范围不能为空！");
				layer.close(searchloading);
				return false;
			}else{
				var dateArr = dateSelect(dateSelectValue);
				BeginDate = $.trim(dateArr[0]);
				EndDate = $.trim(dateArr[1]);
			}
		}
		var DateType = $("#dateClassSelect").val();
		var firstTry = $.ajax({
			type:"post",
			url:"Handler/searchTradeMarkInfo.ashx",
			data:{platformType:1,isWeb:1,TaskID:TaskID,FrontCount:FrontCount,SearchMode:SearchMode,SearchType:SearchType,Content:Content,MarkClass:MarkClass,MarkGroup:MarkGroup,QueryMode:QueryMode,Algorithm:Algorithm,State:State,DateType:DateType,BeginDate:BeginDate,EndDate:EndDate},
			async:false,
			complete:function(){
				isBreak = true;
			},
			success:function(data){
				var dataObj = eval("("+data+")");
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


