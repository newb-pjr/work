$(document).ready(function(){
	$.ajax({
		type:"post",
		url:"Handler/getTaskList.ashx",
		async:false,
		data:{platformType:1,isWeb:1,pageSize:10,page:1},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				var unPayList = dataObj.unpay.split(",");
				for(var i=0; i<dataObj.data.TaskList.length; i++){
					if(dataObj.data.TaskList[i].FinishTime==""){
						$("#unFinishMission").append('<tr><td width="45"><span class="finishIcon"></span></td><td width="1020"><p>任务描述：'+dataObj.data.TaskList[i].TaskType+'</p><p>查询提交时间：'+dataObj.data.TaskList[i].SubTime+'</p></td><td></td></tr>');
					}else{
						for(var j=0; j<unPayList.length; j++){
							if(dataObj.data.TaskList[i].TaskID == unPayList[i]){
								var isAlreadyPay = 0;
							}else{
								var isAlreadyPay = 1;
							}
						}
						$("#finishMission").append('<tr><td width="45"><span class="finishIcon"></span></td><td width="1020"><p>任务描述：'+dataObj.data.TaskList[i].TaskType+'</p><p>查询提交时间：'+dataObj.data.TaskList[i].SubTime+'</p><p>处理完成时间：'+dataObj.data.TaskList[i].FinishTime+'</p></td><td><input type="submit" value="查看>>" class="handleInfoSub" id="" onclick=isPay('+dataObj.data.TaskList[i].TaskID+','+isAlreadyPay+') /></td></tr>');
					}
				}
				if($("#unFinishMission").html()==""){
					$("#unFinishTips").show();
				}
				if($("#finishMission").html()==""){
					$("#finishTips").show();
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
					case -6:
						alert("无任务记录");
						break;
				}
			}
		}
	});
})

function isPay(taskID,isAlreadyPay){
	document.cookie = "TaskID="+taskID;
	var subloading = layer.load(1, {
	  shade: [0.5,'#000']
	});
	var validMethod;
	if(isAlreadyPay==0){
		$.ajax({
			type:"post",
			url:"Handler/userInfo.ashx",
			async:true,
			data:{platformType:1,isWeb:1},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.data.Result == ""){
					alert("没有查询结果！");
					layer.close(subloading);
					return false;
				}
				if(dataObj.status==1){
					if(dataObj.userInfo.userCard==""){
						alert("当前国方卡已过期，请购卡或激活卡再进行操作！");
						layer.close(subloading);
					}
					validMethod = dataObj.userInfo.userCard.validMethod;
				}else{
					dataStatus(dataObj);
					layer.close(subloading);
				}
			}
		});
		validMethodFunc(validMethod,subloading);
	}
	if(isAlreadyPay==1){
		$.ajax({
			type:"post",
			url:"Handler/getSearchResultByTaskID.ashx",
			data:{platformType:1,isWeb:1,TaskID:taskID,SortType:"",BeginRow:1,EndRow:16},
			async:true,
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					window.data = dataObj.data;
					layer.close(subloading);
					closeTab('查询结果');
					handleTab('sbsb-cxjg.html','查询结果');
				}else{
					dataStatus(dataObj);
					layer.close(subloading);
				}
			}
		});
	}
}
